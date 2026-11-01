import { landingContent } from "../content/landingContent";
import { Glance } from "../content/types";
import { Button } from "../ui/Button";
import { Icon, IconName } from "../ui/Icon";
import { Phone } from "../ui/Phone";

export const HERO_PHONE_SIZES = "(min-width: 1024px) 320px, 270px";

const { hero } = landingContent;

interface GlanceTileProps {
  glance: Glance;
  icon: IconName;
  tone: "teal" | "tangerine";
}

// The Home tab's tiles, lifted off the screen. They repeat what the phone shows, so they're hidden
// from screen readers, which already get it from the phone's description.
const GlanceTile = ({ glance, icon, tone }: GlanceTileProps) => (
  <div className={`glance glance--${tone}`} aria-hidden="true">
    <span className="glance__label">
      <Icon name={icon} size={16} />
      {glance.label}
    </span>
    <span className="glance__title">{glance.title}</span>
    <span className="glance__detail">{glance.detail}</span>
  </div>
);

export const Hero = () => (
  <section className="hero" aria-labelledby="hero-title">
    <div className="wrap hero__grid">
      <div className="hero__copy">
        <p className="pill">
          <span className="pill__dot" aria-hidden="true" />
          {hero.pill}
        </p>
        <h1 id="hero-title" className="hero__title">
          {hero.title} <em>{hero.titleAccent}</em>
        </h1>
        <p className="hero__lead">{hero.lead}</p>
        <div className="hero__actions" data-hides-sticky-cta>
          <Button href={hero.cta.href} trailingIcon="arrow">
            {hero.cta.label}
          </Button>
          <p className="hero__helper">{hero.helper}</p>
        </div>
      </div>
      <div className="hero__visual">
        <span className="hero__arch" aria-hidden="true" />
        <Phone screen={hero.screen} sizes={HERO_PHONE_SIZES} priority tilted />
        <GlanceTile glance={hero.glances.chore} icon="chores" tone="teal" />
        <GlanceTile glance={hero.glances.shopping} icon="shopping" tone="tangerine" />
        <p className="hero__caption">{hero.caption}</p>
      </div>
    </div>
  </section>
);
