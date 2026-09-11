import { Link } from "react-router-dom";
import { mailto } from "../data";

/**
 * Shared top navigation.
 * On the homepage the section links are in-page anchors; elsewhere they need
 * to point back at the homepage first.
 *
 * Between phone and full desktop widths there isn't room for every link on one
 * line, so the two marked nav-link-secondary step aside there. Both stay
 * reachable from the footer and the homepage.
 */
export default function Nav({ home = false }) {
  const href = (hash) => (home ? `#${hash}` : `/#${hash}`);

  return (
    <nav className="nav">
      <Link to="/" className="logo">
        Foundr<span>Books</span>
      </Link>
      <div className="nav-links">
        <a href={href("services")} className="nav-link">Services</a>
        <Link to="/saas-accounting" className="nav-link">SaaS accounting</Link>
        <Link to="/frs-102-section-23" className="nav-link">FRS 102 changes</Link>
        <a href={href("pricing")} className="nav-link">Pricing</a>
        <Link to="/ireland-or-uk" className="nav-link nav-link-secondary">Ireland or UK?</Link>
        <Link to="/about" className="nav-link">About</Link>
        <a href={href("ai")} className="nav-link nav-link-secondary">AI assistant</a>
        <a href={mailto()} className="nav-cta">Free 30-min call</a>
      </div>
    </nav>
  );
}
