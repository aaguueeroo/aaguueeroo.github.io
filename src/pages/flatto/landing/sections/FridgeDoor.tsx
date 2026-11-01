import { landingContent } from "../content/landingContent";
import { Eyebrow } from "../ui/Eyebrow";

const { fridge } = landingContent;

export const FridgeDoor = () => (
  <section className="fridge" aria-labelledby="fridge-title">
    <div className="wrap fridge__grid">
      <div className="fridge__copy" data-reveal>
        <Eyebrow>{fridge.eyebrow}</Eyebrow>
        <h2 id="fridge-title" className="section-title">
          {fridge.title}
        </h2>
        <p className="section-lead">{fridge.body}</p>
      </div>
      <div className="fridge__door">
        <span className="fridge__handle" aria-hidden="true" />
        <ul className="fridge__notes">
          {fridge.notes.map((note) => (
            <li key={note.text} className={`note note--${note.tone}`} data-reveal>
              {note.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
    <p className="wrap statement" data-reveal>
      {fridge.statement} <em>{fridge.statementAccent}</em>
    </p>
  </section>
);
