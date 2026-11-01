import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { initChoreDemo } from "../behaviour/choreDemo";
import { initCopyAddress } from "../behaviour/copyAddress";
import { initReveal } from "../behaviour/reveal";
import { initShareLinks } from "../behaviour/shareLink";
import { initStickyCta } from "../behaviour/stickyCta";
import { LandingPage } from "../LandingPage";

type ObserverCallback = (entries: Array<{ target: Element; isIntersecting: boolean }>) => void;

class FakeIntersectionObserver {
  static latest: FakeIntersectionObserver;
  observed: Element[] = [];

  constructor(public callback: ObserverCallback) {
    FakeIntersectionObserver.latest = this;
  }

  observe = (element: Element) => {
    this.observed.push(element);
  };

  unobserve = (element: Element) => {
    this.observed = this.observed.filter((observed) => observed !== element);
  };
}

const mountPage = () => {
  const root = document.createElement("div");
  root.innerHTML = renderToStaticMarkup(createElement(LandingPage));
  return root;
};

const setNavigator = (key: "clipboard" | "share", value: unknown) =>
  Object.defineProperty(navigator, key, { value, configurable: true });

afterEach(() => {
  vi.unstubAllGlobals();
  setNavigator("clipboard", undefined);
  setNavigator("share", undefined);
});

describe("chore demo", () => {
  const setUp = () => {
    const root = mountPage();
    initChoreDemo(root);
    const demo = root.querySelector<HTMLElement>("[data-chore-demo]") as HTMLElement;
    const done = root.querySelector<HTMLButtonElement>('[data-chore-action="done"]');
    const undo = root.querySelector<HTMLButtonElement>('[data-chore-action="undo"]');
    return { demo, done: done as HTMLButtonElement, undo: undo as HTMLButtonElement };
  };

  it("starts with only Mark as done on show", () => {
    const { demo, done, undo } = setUp();

    expect(demo.dataset.state).toBe("pending");
    expect(done.hidden).toBe(false);
    expect(undo.hidden).toBe(true);
  });

  it("posts the result and offers Undo once done", () => {
    const { demo, done, undo } = setUp();
    done.click();

    expect(demo.dataset.state).toBe("done");
    expect(done.hidden).toBe(true);
    expect(undo.hidden).toBe(false);
    demo
      .querySelectorAll<HTMLElement>("[data-chore-event]")
      .forEach((event) => expect(event.hidden).toBe(false));
  });

  it("goes back to the start on Undo", () => {
    const { demo, done, undo } = setUp();
    done.click();
    undo.click();

    expect(demo.dataset.state).toBe("pending");
    expect(done.hidden).toBe(false);
    demo
      .querySelectorAll<HTMLElement>("[data-chore-event]")
      .forEach((event) => expect(event.hidden).toBe(true));
  });
});

describe("sticky call to action", () => {
  const setUp = () => {
    vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
    const root = mountPage();
    initStickyCta(root);
    const bar = root.querySelector("[data-sticky-cta]") as HTMLElement;
    const hero = root.querySelector(".hero__actions") as HTMLElement;
    const join = root.querySelector("#join") as HTMLElement;
    return { bar, hero, join, observer: FakeIntersectionObserver.latest };
  };

  it("stays away while the hero's button is on screen", () => {
    const { bar, hero, observer } = setUp();
    observer.callback([{ target: hero, isIntersecting: true }]);

    expect(bar.classList.contains("is-visible")).toBe(false);
  });

  it("appears once the hero's button has gone", () => {
    const { bar, hero, observer } = setUp();
    observer.callback([{ target: hero, isIntersecting: true }]);
    observer.callback([{ target: hero, isIntersecting: false }]);

    expect(bar.classList.contains("is-visible")).toBe(true);
  });

  it("gets out of the way at the join section", () => {
    const { bar, hero, join, observer } = setUp();
    observer.callback([{ target: hero, isIntersecting: false }]);
    observer.callback([{ target: join, isIntersecting: true }]);

    expect(bar.classList.contains("is-visible")).toBe(false);
  });
});

describe("reveal", () => {
  it("shows an element when it reaches the screen, then stops watching it", () => {
    vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
    vi.stubGlobal("matchMedia", () => ({ matches: false }));
    const root = mountPage();
    initReveal(root);

    const observer = FakeIntersectionObserver.latest;
    const first = root.querySelector("[data-reveal]") as HTMLElement;
    const watched = observer.observed.length;
    observer.callback([{ target: first, isIntersecting: true }]);

    expect(first.classList.contains("is-visible")).toBe(true);
    expect(observer.observed).toHaveLength(watched - 1);
  });

  it("shows everything at once for people who prefer less motion", () => {
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    const root = mountPage();
    initReveal(root);

    root
      .querySelectorAll("[data-reveal]")
      .forEach((element) => expect(element.classList.contains("is-visible")).toBe(true));
  });
});

describe("copy address", () => {
  it("stays hidden where the browser can't copy", () => {
    setNavigator("clipboard", undefined);
    const root = mountPage();
    initCopyAddress(root);

    expect(root.querySelector<HTMLButtonElement>("[data-copy]")?.hidden).toBe(true);
  });

  it("copies the address and confirms it", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    setNavigator("clipboard", { writeText });
    const root = mountPage();
    initCopyAddress(root);

    const button = root.querySelector("[data-copy]") as HTMLButtonElement;
    expect(button.hidden).toBe(false);
    button.click();
    await vi.waitFor(() => expect(button.textContent).toBe("Copied"));

    expect(writeText).toHaveBeenCalledWith("flatto@juliaaguero.com");
  });

  it("keeps its label when copying is refused", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    setNavigator("clipboard", { writeText });
    const root = mountPage();
    initCopyAddress(root);

    const button = root.querySelector("[data-copy]") as HTMLButtonElement;
    const label = button.textContent;
    button.click();
    await vi.waitFor(() => expect(writeText).toHaveBeenCalled());

    expect(button.textContent).toBe(label);
  });
});

describe("share link", () => {
  it("leaves the WhatsApp link alone where there's no share sheet", () => {
    setNavigator("share", undefined);
    const root = mountPage();
    initShareLinks(root);

    const link = root.querySelector("[data-share-text]") as HTMLAnchorElement;
    const click = new MouseEvent("click", { bubbles: true, cancelable: true });
    link.dispatchEvent(click);

    expect(click.defaultPrevented).toBe(false);
  });

  it("uses the phone's share sheet where there is one", () => {
    const share = vi.fn().mockResolvedValue(undefined);
    setNavigator("share", share);
    const root = mountPage();
    initShareLinks(root);

    const link = root.querySelector("[data-share-text]") as HTMLAnchorElement;
    const click = new MouseEvent("click", { bubbles: true, cancelable: true });
    link.dispatchEvent(click);

    expect(click.defaultPrevented).toBe(true);
    expect(share).toHaveBeenCalledWith({ text: link.dataset.shareText });
  });
});
