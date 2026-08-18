/**
 * Renders a FAQ block from the same array used to build the FAQPage JSON-LD,
 * so the structured data always matches what's visible on the page — which is
 * what Google requires for FAQ rich results.
 */
export default function FaqSection({ items, heading = "Common questions." }) {
  return (
    <section className="section faq-section">
      <div className="section-label">FAQ</div>
      <h2>{heading}</h2>
      <div className="faq-list">
        {items.map((item, i) => (
          <div key={i} className="faq-item">
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
