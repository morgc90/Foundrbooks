import { Link } from "react-router-dom";
import { mailto, whatsappLink } from "../data";

export default function CtaSection({ heading, sub, subject, disclaimer }) {
  return (
    <section className="section cta-section">
      <h2>{heading}</h2>
      {sub && <p className="section-sub">{sub}</p>}
      <div className="hero-btns">
        <a href={mailto(subject)} className="btn-primary btn-primary-blue">
          Book a free 30-min call →
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost btn-ghost-light"
        >
          Chat on WhatsApp
        </a>
        <Link to="/#pricing" className="btn-ghost btn-ghost-light">See pricing</Link>
      </div>
      {disclaimer && <p className="disclaimer">{disclaimer}</p>}
    </section>
  );
}
