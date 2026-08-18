import { Link } from "react-router-dom";
import { CONTACT } from "../data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="logo" style={{ marginBottom: 8 }}>
            Foundr<span>Books</span>
          </div>
          <p className="footer-desc">
            Specialist accounting for online founders, freelancers, and the self-employed. ACA qualified.
          </p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <div className="footer-col-title">Services</div>
            <Link to="/saas-accounting">SaaS accounting</Link>
            <a href="/#services">Startup accounting</a>
            <a href="/#services">Shopify bookkeeping</a>
            <a href="/#services">VAT &amp; compliance</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Contact</div>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            <Link to="/">foundrbooks.com</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 FoundrBooks. All rights reserved.</span>
        <span>ACA Qualified · Ireland &amp; Spain · Payments by Stripe</span>
      </div>
    </footer>
  );
}
