import { useEffect, useRef, useState } from "react";

/**
 * Animated hero visual — a stylised SaaS revenue dashboard.
 *
 * Replaces the previous stock photograph. Everything is inline SVG + CSS so
 * there is no image request, it stays sharp on any display, and it reinforces
 * the SaaS positioning rather than showing generic office stock.
 *
 * Decorative: the whole block is aria-hidden and the figures are labelled
 * "Sample" in the UI so it can't be read as real client data.
 * All motion is suppressed under prefers-reduced-motion.
 */

// Illustrative MRR curve — 14 points, smooth upward trend.
const SERIES = [12, 15, 19, 24, 22, 29, 35, 41, 47, 54, 63, 71, 84, 97];

const W = 320;
const H = 116;
const PAD = 6;

function buildPaths(values) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;

  const pts = values.map((v, i) => {
    const x = PAD + (i * (W - PAD * 2)) / (values.length - 1);
    const y = PAD + (1 - (v - min) / span) * (H - PAD * 2);
    return [x, y];
  });

  // Catmull-Rom style smoothing into cubic béziers.
  let line = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i === 0 ? 0 : i - 1];
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const [x3, y3] = pts[i + 2] || pts[i + 1];
    const c1x = x1 + (x2 - x0) / 6;
    const c1y = y1 + (y2 - y0) / 6;
    const c2x = x2 - (x3 - x1) / 6;
    const c2y = y2 - (y3 - y1) / 6;
    line += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }

  const area = `${line} L ${pts[pts.length - 1][0].toFixed(1)} ${H} L ${pts[0][0].toFixed(1)} ${H} Z`;

  return { line, area, last: pts[pts.length - 1] };
}

const { line: LINE_PATH, area: AREA_PATH, last: LAST_POINT } = buildPaths(SERIES);

const MRR_TARGET = 18420;

const fmt = (n) => `€${Math.round(n).toLocaleString("en-IE")}`;

function useCountUp(target, duration = 1400) {
  // Starts at the final value so server-rendered markup and first paint agree,
  // then replays the count-up once mounted (unless motion is reduced).
  const [value, setValue] = useState(target);
  const frame = useRef();

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const start = performance.now();
    setValue(0);

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => frame.current && cancelAnimationFrame(frame.current);
  }, [target, duration]);

  return value;
}

export default function HeroVisual() {
  const mrr = useCountUp(MRR_TARGET);

  return (
    <div className="hv" aria-hidden="true">
      <div className="hv-glow hv-glow-a" />
      <div className="hv-glow hv-glow-b" />

      {/* Main dashboard card */}
      <div className="hv-card">
        <div className="hv-card-top">
          <div className="hv-card-title">
            <span className="hv-live" />
            Recurring revenue
          </div>
          <span className="hv-tag">Sample</span>
        </div>

        <div className="hv-figure">
          <div className="hv-value">{fmt(mrr)}</div>
          <div className="hv-delta">▲ 12.4%</div>
        </div>
        <div className="hv-caption">MRR · last 14 months</div>

        <svg className="hv-chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="presentation">
          <defs>
            <linearGradient id="hvFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5ba3f5" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#5ba3f5" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Recessive gridlines */}
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1="0"
              x2={W}
              y1={PAD + f * (H - PAD * 2)}
              y2={PAD + f * (H - PAD * 2)}
              className="hv-grid"
            />
          ))}

          <path d={AREA_PATH} fill="url(#hvFill)" className="hv-area" />
          <path d={LINE_PATH} className="hv-line" />

          <circle cx={LAST_POINT[0]} cy={LAST_POINT[1]} r="7" className="hv-dot-halo" />
          <circle cx={LAST_POINT[0]} cy={LAST_POINT[1]} r="3.5" className="hv-dot" />
        </svg>

        <div className="hv-chips">
          <div className="hv-chip">
            <span className="hv-chip-k">ARR</span>
            <span className="hv-chip-v">€221k</span>
          </div>
          <div className="hv-chip">
            <span className="hv-chip-k">Net retention</span>
            <span className="hv-chip-v">112%</span>
          </div>
          <div className="hv-chip">
            <span className="hv-chip-k">Churn</span>
            <span className="hv-chip-v">1.8%</span>
          </div>
        </div>
      </div>

      {/* Overlapping mini card — deferred revenue release */}
      <div className="hv-mini">
        <div className="hv-mini-title">Deferred revenue</div>
        {[
          { m: "Recognised", w: 68 },
          { m: "Next 3 mo", w: 44 },
          { m: "Beyond", w: 22 },
        ].map((r, i) => (
          <div className="hv-mini-row" key={r.m}>
            <span className="hv-mini-label">{r.m}</span>
            <span className="hv-mini-track">
              <span className="hv-mini-bar" style={{ "--w": `${r.w}%`, "--d": `${i * 0.18}s` }} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
