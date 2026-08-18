import { Link } from "react-router-dom";
import { GUIDES } from "../data";

/**
 * Cross-links between the guide pages. Internal linking matters: an orphaned
 * page ranks poorly no matter how good it is.
 */
export default function GuideLinks({ current }) {
  const others = GUIDES.filter((g) => g.to !== current);
  if (!others.length) return null;

  return (
    <section className="section guides-section">
      <div className="section-label">Related guides</div>
      <h2>Keep reading.</h2>
      <div className="guides-grid">
        {others.map((g) => (
          <Link key={g.to} to={g.to} className="guide-card">
            <div className="guide-name">{g.name}</div>
            <div className="guide-desc">{g.desc}</div>
            <div className="guide-more">Read →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
