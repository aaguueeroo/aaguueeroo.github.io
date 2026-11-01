import { renderToStaticMarkup } from "react-dom/server";
import { landingContent } from "../content/landingContent";
import { LandingPage } from "../LandingPage";

const page = new DOMParser().parseFromString(renderToStaticMarkup(<LandingPage />), "text/html");

const all = <T extends Element = HTMLElement>(selector: string) =>
  Array.from(page.querySelectorAll<T>(selector));

describe("Flatto landing page", () => {
  it("has one main heading and never skips a heading level", () => {
    const levels = all("h1, h2, h3").map((heading) => Number(heading.tagName[1]));

    expect(levels.filter((level) => level === 1)).toHaveLength(1);
    levels.reduce((previous, level) => {
      expect(level - previous).toBeLessThanOrEqual(1);
      return level;
    });
  });

  it("sends every in-page link to something that exists", () => {
    const targets = all<HTMLAnchorElement>('a[href^="#"]').map((link) => link.getAttribute("href"));

    expect(targets.length).toBeGreaterThan(0);
    targets.forEach((target) => expect(page.querySelector(target as string)).not.toBeNull());
  });

  it("gives every image a description and fixed dimensions", () => {
    all<HTMLImageElement>("img").forEach((image) => {
      expect(image.hasAttribute("alt")).toBe(true);
      expect(image.getAttribute("width")).toBeTruthy();
      expect(image.getAttribute("height")).toBeTruthy();
    });
  });

  it("describes every app screen as an image of the demo flat", () => {
    const screens = all<HTMLImageElement>(".phone__screen");

    expect(screens).toHaveLength(4);
    screens.forEach((screen) => expect(screen.alt).toContain("demo flat"));
  });

  it("loads only the hero's phone eagerly", () => {
    const eager = all<HTMLImageElement>(".phone__screen").filter(
      (screen) => screen.getAttribute("loading") !== "lazy",
    );

    expect(eager).toHaveLength(1);
    expect(eager[0].getAttribute("fetchpriority")).toBe("high");
  });

  it("offers a prepared email for each phone", () => {
    const links = all<HTMLAnchorElement>('.join__buttons a[href^="mailto:"]');

    expect(links).toHaveLength(2);
    expect(decodeURIComponent(links[0].href)).toContain("Flatto tester: iPhone");
    expect(decodeURIComponent(links[1].href)).toContain("Flatto tester: Android");
  });

  it("keeps the address on the page for when no email app opens", () => {
    expect(page.querySelector(".join__fallback")?.textContent).toContain(
      landingContent.join.email,
    );
    expect(page.querySelector(".join__fallback a[href*='mail.google.com']")).not.toBeNull();
  });

  it("says what happens after pressing a join button", () => {
    expect(page.querySelector(".join__helper")?.textContent).toMatch(/press send/i);
  });

  it("links to the privacy policy, whose path the app stores depend on", () => {
    expect(all<HTMLAnchorElement>('a[href="/flatto/privacy-policy"]').length).toBeGreaterThan(0);
  });

  it("works without JavaScript: controls that need it start hidden", () => {
    all<HTMLButtonElement>("button").forEach((button) => expect(button.hidden).toBe(true));
    expect(page.querySelectorAll("details")).toHaveLength(landingContent.questions.items.length);
  });

  it("loads nothing from another site", () => {
    expect(all("script[src], iframe, link[rel='stylesheet']")).toHaveLength(0);
    all<HTMLImageElement>("img, source").forEach((media) => {
      const source = media.getAttribute("src") ?? media.getAttribute("srcset") ?? "";
      expect(source.startsWith("/flatto/")).toBe(true);
    });
  });
});

describe("Flatto landing page copy", () => {
  const text = page.body.textContent ?? "";

  it("avoids hype words", () => {
    expect(text).not.toMatch(/seamless|effortless|revolution|game.?changer|harmony/i);
  });

  it("is honest about what the app doesn't do yet", () => {
    const answers = landingContent.questions.items.map((item) => item.answer.join(" "));

    expect(answers.some((answer) => /no push notifications/i.test(answer))).toBe(true);
    expect(answers.some((answer) => /doesn't work out who owes what/i.test(answer))).toBe(true);
    expect(answers.some((answer) => /isn't on the App Store or Google Play/i.test(answer))).toBe(
      true,
    );
  });

  it("only mentions reminders and notifications in that honest answer", () => {
    const outsideQuestions = text.replace(page.querySelector(".questions")?.textContent ?? "", "");

    expect(outsideQuestions).not.toMatch(/reminder|notification/i);
  });

  it("doesn't claim users, ratings or testimonials that don't exist", () => {
    expect(text).not.toMatch(/\d+\s*(users|flats|testers|downloads)|stars?\b|rated|testimonial/i);
  });
});
