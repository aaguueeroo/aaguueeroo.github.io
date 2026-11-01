import { landingContent } from "../content/landingContent";
import { Logo } from "../ui/Logo";

const { header, footer } = landingContent;

export const Footer = () => (
  <footer className="footer" data-hides-sticky-cta>
    <div className="wrap footer__grid">
      <div className="footer__brand">
        <Logo name={header.brand} />
        <p>{footer.tagline}</p>
      </div>
      <nav className="footer__links" aria-label="Footer">
        {footer.links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
        <a href={footer.credit.href}>{footer.credit.label}</a>
      </nav>
      <p className="footer__note">{footer.note}</p>
    </div>
  </footer>
);
