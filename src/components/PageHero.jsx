import Nav from "./Nav";
import { mailto, whatsappLink } from "../data";

/**
 * Dark page header shared by the guide pages.
 */
export default function PageHero({ badge, title, sub, ctaSubject }) {
  return (
    <div className="page-head">
      <Nav />
      <div className="page-head-inner">
        {badge && (
          <div className="hero-badge">
            <span className="badge-dot" />
            {badge}
          </div>
        )}
        <h1>{title}</h1>
        {sub && <p className="hero-sub page-head-sub">{sub}</p>}
        <div className="hero-btns">
          <a href={mailto(ctaSubject)} className="btn-primary">Book a free 30-min call</a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Chat on WhatsApp →
          </a>
        </div>
      </div>
    </div>
  );
}
