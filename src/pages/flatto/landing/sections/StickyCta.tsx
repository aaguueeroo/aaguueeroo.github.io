import { landingContent } from "../content/landingContent";
import { Button } from "../ui/Button";

const { stickyCta } = landingContent;

// Phones only. behaviour/stickyCta.ts shows it once no other way to join is on screen.
export const StickyCta = () => (
  <div className="sticky-cta" data-sticky-cta>
    <Button href={stickyCta.href} trailingIcon="arrow">
      {stickyCta.label}
    </Button>
  </div>
);
