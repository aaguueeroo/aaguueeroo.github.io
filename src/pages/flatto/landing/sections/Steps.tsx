import { landingContent } from "../content/landingContent";
import { Eyebrow } from "../ui/Eyebrow";

const { steps } = landingContent;

export const Steps = () => (
  <section className="steps" aria-labelledby="steps-title">
    <div className="wrap">
      <div className="steps__intro" data-reveal>
        <Eyebrow>{steps.eyebrow}</Eyebrow>
        <h2 id="steps-title" className="section-title">
          {steps.title}
        </h2>
      </div>
      <ol className="steps__list">
        {steps.items.map((step, index) => (
          <li key={step.title} className="step" data-reveal>
            <span className="step__number" aria-hidden="true">
              {index + 1}
            </span>
            <h3 className="step__title">{step.title}</h3>
            <p className="step__text">{step.text}</p>
            <p className="step__card" aria-hidden="true">
              <span>{step.card.label}</span>
              <strong>{step.card.value}</strong>
            </p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
