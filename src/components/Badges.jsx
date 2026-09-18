import { BADGES } from "../data";

/**
 * Row of credential badges (Xero, A2X).
 *
 * Each is the issuer's own artwork with a transparent background, so they sit
 * directly on the dark hero and footer. Shown above each issuer's minimum size,
 * never recoloured or reshaped. Adding another means one entry in BADGES.
 */
export default function Badges({ className = "" }) {
  return (
    <div className={"badge-row " + className}>
      {BADGES.map((b) => (
        <a key={b.key} href={b.href} target="_blank" rel="noopener noreferrer" aria-label={b.alt}>
          <img src={b.src} alt={b.alt} width={b.w} height={b.h} />
        </a>
      ))}
    </div>
  );
}
