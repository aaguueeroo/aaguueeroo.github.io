import { landingContent } from "../content/landingContent";
import { buildGmailLink, buildMailtoLink, buildWhatsAppLink } from "../domain/testerLinks";

const draft = {
  to: "flatto@juliaaguero.com",
  subject: "Flatto tester: iPhone",
  body: "Hi Julia,\n\nI'm on iPhone & Android?\n\nThanks!",
};

describe("tester links", () => {
  it("keeps every character of the prepared email through a mailto link", () => {
    const url = new URL(buildMailtoLink(draft));

    expect(url.protocol).toBe("mailto:");
    expect(url.pathname).toBe(draft.to);
    expect(decodeURIComponent(url.search)).toContain(draft.body);
    expect(buildMailtoLink(draft)).not.toContain(" ");
  });

  it("opens Gmail's compose window with the same message", () => {
    const url = new URL(buildGmailLink(draft));

    expect(url.host).toBe("mail.google.com");
    expect(url.searchParams.get("view")).toBe("cm");
    expect(url.searchParams.get("to")).toBe(draft.to);
    expect(url.searchParams.get("su")).toBe(draft.subject);
    expect(url.searchParams.get("body")).toBe(draft.body);
  });

  it("encodes spaces so Gmail can't read them as plus signs", () => {
    expect(buildGmailLink(draft)).not.toContain("+");
  });

  it("puts the page's address in the message for the flat chat", () => {
    const url = new URL(buildWhatsAppLink(landingContent.join.shareMessage));

    expect(url.host).toBe("wa.me");
    expect(url.searchParams.get("text")).toContain(landingContent.meta.url);
  });
});
