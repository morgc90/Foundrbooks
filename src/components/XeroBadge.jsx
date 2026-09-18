import { XERO } from "../data";

/**
 * Xero partner badge.
 *
 * Xero's own L2 Certified Professional badge, with a transparent background,
 * so it sits directly on the dark hero and footer. Rendered above Xero's 40px
 * minimum height with clear space around it, and never recoloured or reshaped.
 */
export default function XeroBadge({ className = "" }) {
  if (!XERO.partner) return null;
  return (
    <a
      className={"xero-badge " + className}
      href={XERO.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${XERO.badgeAlt} — visit xero.com`}
    >
      <img
        src={XERO.badge}
        alt={XERO.badgeAlt}
        width={XERO.badgeWidth}
        height={XERO.badgeHeight}
      />
    </a>
  );
}
