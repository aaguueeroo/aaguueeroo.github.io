import { Screen } from "../content/types";
import { SCREEN_HEIGHT, SCREEN_WIDTH, screenSources } from "./screenSources";

interface PhoneProps {
  screen: Screen;
  sizes: string;
  // The hero's phone is above the fold on every device, so it skips the lazy loading.
  priority?: boolean;
  tilted?: boolean;
}

export const Phone = ({ screen, sizes, priority = false, tilted = false }: PhoneProps) => (
  <div className={tilted ? "phone phone--tilted" : "phone"}>
    <span className="phone__island" aria-hidden="true" />
    <picture>
      <source type="image/avif" srcSet={screenSources(screen.name)} sizes={sizes} />
      <img
        className="phone__screen"
        src={`/flatto/images/${screen.name}-${SCREEN_WIDTH}.jpg`}
        alt={screen.alt}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        decoding="async"
        {...(priority ? { fetchpriority: "high" } : { loading: "lazy" as const })}
      />
    </picture>
  </div>
);
