import { landingContent } from "../content/landingContent";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";

const { header } = landingContent;

export const Header = () => (
  <header className="header">
    <div className="wrap header__bar">
      <a className="header__home" href="#top" aria-label={header.home}>
        <Logo name={header.brand} />
      </a>
      <nav className="header__nav" aria-label={header.navLabel}>
        {header.nav.map((link) => (
          <a key={link.href} className="header__link" href={link.href}>
            {link.label}
          </a>
        ))}
        <Button href={header.cta.href} size="small">
          {header.cta.label}
        </Button>
      </nav>
    </div>
  </header>
);
