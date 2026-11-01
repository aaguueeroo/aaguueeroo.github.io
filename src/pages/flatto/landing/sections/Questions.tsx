import { landingContent } from "../content/landingContent";
import { Eyebrow } from "../ui/Eyebrow";
import { InlineLinks } from "../ui/InlineLinks";

const { questions } = landingContent;

export const Questions = () => (
  <section className="questions" id={questions.id} aria-labelledby="questions-title">
    <div className="wrap questions__grid">
      <div className="questions__intro">
        <Eyebrow>{questions.eyebrow}</Eyebrow>
        <h2 id="questions-title" className="section-title">
          {questions.title}
        </h2>
      </div>
      <div className="questions__list">
        {questions.items.map((item) => (
          <details key={item.question} className="question" name="questions">
            <summary className="question__summary">{item.question}</summary>
            <p className="question__answer">
              <InlineLinks text={item.answer} />
            </p>
          </details>
        ))}
      </div>
    </div>
  </section>
);
