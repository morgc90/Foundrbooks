import { Link } from "react-router-dom";
import { mailto } from "../data";

/**
 * Shared top navigation.
 * On the homepage the section links are in-page anchors; elsewhere they need
 * to point back at the homepage first.
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
        <a href={href("pricing")} className="nav-link">Pricing</a>
        <a href={href("ai")} className="nav-link">AI assistant</a>
        <a href={mailto()} className="nav-cta">Free 30-min call</a>
      </div>
    </nav>
  );
}
