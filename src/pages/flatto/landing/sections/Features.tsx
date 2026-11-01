import { landingContent } from "../content/landingContent";
import { Feature, FeatureVisual } from "../content/types";
import { Eyebrow } from "../ui/Eyebrow";
import { Icon } from "../ui/Icon";
import { Phone } from "../ui/Phone";
import { ChatTranscript } from "./ChatTranscript";
import { ChoreDemoCard } from "./ChoreDemoCard";

const PANEL_PHONE_SIZES = "(min-width: 1024px) 300px, 260px";

const { meet, features } = landingContent;

const Visual = ({ visual }: { visual: FeatureVisual }) => {
  switch (visual.kind) {
    case "chores":
      return (
        <>
          <ChoreDemoCard demo={visual.demo} />
          <Phone screen={visual.screen} sizes={PANEL_PHONE_SIZES} />
        </>
      );
    case "shopping":
      return <Phone screen={visual.screen} sizes={PANEL_PHONE_SIZES} />;
    case "chat":
      return <ChatTranscript entries={visual.entries} />;
    case "flat":
      return (
        <>
          <Phone screen={visual.screen} sizes={PANEL_PHONE_SIZES} />
          <div className="cost" aria-hidden="true">
            <span className="cost__label">{visual.cost.label}</span>
            <span className="cost__total">{visual.cost.total}</span>
            {visual.cost.lines.map((line) => (
              <span key={line.label} className="cost__line">
                {line.label} <strong>{line.value}</strong>
              </span>
            ))}
          </div>
        </>
      );
  }
};

const Panel = ({ feature }: { feature: Feature }) => (
  <article
    className={`panel panel--${feature.tone} panel--${feature.visual.kind}`}
    aria-labelledby={`${feature.id}-title`}
  >
    <div className="panel__copy">
      <p className="panel__label">
        <Icon name={feature.icon} size={18} />
        {feature.label}
      </p>
      <h3 id={`${feature.id}-title`} className="panel__title">
        {feature.title}
      </h3>
      <p className="panel__body">{feature.body}</p>
      <ul className="points">
        {feature.points.map((point) => (
          <li key={point.title}>
            <strong>{point.title}</strong> {point.text}
          </li>
        ))}
      </ul>
      <a className="text-link" href={features.link.href}>
        {features.link.label}
        <Icon name="arrow" size={18} />
      </a>
    </div>
    <div className="panel__visual">
      <Visual visual={feature.visual} />
    </div>
  </article>
);

export const Features = () => (
  <section className="features" id={meet.id} aria-labelledby="meet-title">
    <div className="wrap meet" data-reveal>
      <Eyebrow>{meet.eyebrow}</Eyebrow>
      <h2 id="meet-title" className="meet__title">
        {meet.title}
      </h2>
      <p className="section-lead">{meet.lead}</p>
    </div>
    <div className="wrap panels">
      {features.items.map((feature) => (
        <Panel key={feature.id} feature={feature} />
      ))}
    </div>
  </section>
);
