import { Link } from "react-router-dom";
import { CONTACT, CREDENTIAL, GUIDES, whatsappLink } from "../data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="logo" style={{ marginBottom: 8 }}>
            Foundr<span>Books</span>
          </div>
          <p className="footer-desc">
            Specialist accounting for founders, freelancers and the self-employed across the UK
            and Ireland.
          </p>
          <a
            className="footer-credential"
            href={CREDENTIAL.directoryUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {CREDENTIAL.name} · listed with {CREDENTIAL.body} ↗
          </a>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <div className="footer-col-title">Guides</div>
            {GUIDES.map((g) => (
              <Link key={g.to} to={g.to}>{g.name}</Link>
            ))}
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Services</div>
            <a href="/#services">Startup accounting</a>
            <a href="/#pricing">Pricing</a>
            <a href="/#ai">AI tax assistant</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Contact</div>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp
            </a>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <Link to="/">foundrbooks.com</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 FoundrBooks. All rights reserved.</span>
        <span>Chartered accountant · UK &amp; Ireland · Payments by Stripe</span>
      </div>
    </footer>
  );
}
