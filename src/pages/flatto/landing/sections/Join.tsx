import { landingContent } from "../content/landingContent";
import { buildGmailLink, buildMailtoLink, buildWhatsAppLink } from "../domain/testerLinks";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";

const { join } = landingContent;

export const Join = () => (
  <section className="join" id={join.id} aria-labelledby="join-title" data-hides-sticky-cta>
    <div className="wrap">
      <div className="join__panel">
        <Eyebrow>{join.eyebrow}</Eyebrow>
        <h2 id="join-title" className="join__title">
          <span className="join__line">
            {join.titleBefore} <span className="join__bubble">{join.titleMuted}</span>
          </span>
          <span className="join__line">
            {join.titleAfter}{" "}
            <span className="join__bubble join__bubble--bright">{join.titleBright}</span>
          </span>
        </h2>
        <p className="join__lead">{join.lead}</p>

        <p className="join__question">{join.question}</p>
        <div className="join__buttons">
          {join.phones.map((phone) => (
            <Button
              key={phone.platform}
              variant="bright"
              icon={phone.platform}
              href={buildMailtoLink({
                to: join.email,
                subject: phone.subject,
                body: phone.body,
              })}
            >
              {phone.label}
            </Button>
          ))}
        </div>
        <p className="join__helper">{join.helper}</p>

        <div className="join__fallback">
          <p>
            {join.fallback} <a href={`mailto:${join.email}`}>{join.email}</a>
          </p>
          <div className="join__fallback-actions">
            <button
              className="join__fallback-action"
              type="button"
              data-copy={join.email}
              data-copied-label={join.copiedLabel}
              hidden
            >
              {join.copyLabel}
            </button>
            <a
              className="join__fallback-action"
              href={buildGmailLink({
                to: join.email,
                subject: join.gmailSubject,
                body: join.gmailBody,
              })}
            >
              {join.gmailLabel}
            </a>
          </div>
        </div>

        <div className="join__share">
          <p>{join.sharePrompt}</p>
          <Button
            variant="ghost"
            icon="whatsapp"
            size="small"
            href={buildWhatsAppLink(join.shareMessage)}
            data-share-text={join.shareMessage}
          >
            {join.shareLabel}
          </Button>
        </div>
      </div>
    </div>
  </section>
);
