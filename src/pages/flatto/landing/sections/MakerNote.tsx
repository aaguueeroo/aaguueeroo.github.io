import { landingContent } from "../content/landingContent";
import { Eyebrow } from "../ui/Eyebrow";

const { maker } = landingContent;

export const MakerNote = () => (
  <section className="maker" aria-labelledby="maker-title">
    <div className="wrap maker__inner">
      <Eyebrow>{maker.eyebrow}</Eyebrow>
      <h2 id="maker-title" className="visually-hidden">
        {maker.title}
      </h2>
      <article className="maker__note" data-reveal>
        {maker.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <footer className="maker__signature">
          <img
            className="maker__photo"
            src="/flatto/images/julia.jpg"
            alt={maker.photoAlt}
            width="200"
            height="182"
            loading="lazy"
            decoding="async"
          />
          <span>
            <strong>{maker.signature}</strong>
            {maker.role}
          </span>
        </footer>
      </article>
    </div>
  </section>
);
