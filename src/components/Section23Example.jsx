import { useState } from "react";
import { whatsappLink } from "../data";
import {
  MONTHS, monthLabel as label, lastDay, monthEndLabel as endLabel, switchoverFor, computeExample,
} from "../section23Example";

/**
 * Interactive worked example for the Section 23 switchover.
 *
 * Deliberately narrow: one annual contract, paid up front, spread evenly by
 * month. That is enough to show how the one-off adjustment arises and what the
 * journal looks like — the part people find hard to picture — without
 * pretending to do a real transition, which turns on contract terms, bundles,
 * modifications and the old policy actually applied. Runs in the browser and
 * stores nothing.
 *
 * The arithmetic mirrors the practice's transition engine run on a monthly
 * basis (modified retrospective): the adjustment is income already booked
 * under the old policy that the new rules place after the switchover.
 */

const eur = (n) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", minimumFractionDigits: 2 }).format(n);

export default function Section23Example({ waText }) {
  const [amount, setAmount] = useState("12000");
  const [yearEnd, setYearEnd] = useState(11);            // December
  const switchover = switchoverFor(yearEnd);
  const [startOffset, setStartOffset] = useState(6);     // contract starts 6 months before
  const [policy, setPolicy] = useState("invoice");

  const value = Math.max(0, Math.min(10000000, Number(String(amount).replace(/[^0-9.]/g, "")) || 0));
  const {
    start, monthsBefore, monthsAfter, earnedBefore, earnedAfter, oldPrior, oldFirst, adjustment, completed,
  } = computeExample({ value, yearEnd, startOffset, policy });

  const priorLabel = `Year to ${endLabel(switchover - 1)}`;
  const firstLabel = `Year to ${endLabel(switchover + 11)}`;

  return (
    <div className="ex">
      <div className="ex-form">
        <label className="ex-field">
          <span>Annual contract value</span>
          <span className="ex-money">
            <span aria-hidden="true">€</span>
            <input
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              aria-label="Annual contract value in euro"
            />
          </span>
        </label>
        <label className="ex-field">
          <span>Your year end</span>
          <select value={yearEnd} onChange={(e) => setYearEnd(Number(e.target.value))}>
            {MONTHS.map((m, i) => (
              <option key={m} value={i}>{`${lastDay(2026 * 12 + i)} ${m}`}</option>
            ))}
          </select>
        </label>
        <label className="ex-field">
          <span>Contract starts, paid in full</span>
          <select value={startOffset} onChange={(e) => setStartOffset(Number(e.target.value))}>
            {Array.from({ length: 12 }, (_, i) => 12 - i).map((off) => (
              <option key={off} value={off}>{label(switchover - off)}</option>
            ))}
          </select>
        </label>
        <div className="ex-field">
          <span id="ex-policy">Booked until now</span>
          <div className="ex-toggle" role="radiogroup" aria-labelledby="ex-policy">
            {[["invoice", "On invoice"], ["spread", "Over the year"]].map(([k, text]) => (
              <button
                key={k}
                type="button"
                role="radio"
                aria-checked={policy === k}
                className={policy === k ? "is-on" : ""}
                onClick={() => setPolicy(k)}
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="ex-strip" aria-label={`${monthsBefore} months before the switchover, ${monthsAfter} after`}>
        {Array.from({ length: 12 }, (_, i) => start + i).map((m) => (
          <div key={m} className={m < switchover ? "ex-m ex-before" : "ex-m ex-after"}>
            <span>{MONTHS[m % 12].slice(0, 3)}</span>
          </div>
        ))}
      </div>
      <div className="ex-strip-key">
        <span><i className="ex-before" /> {monthsBefore} month{monthsBefore === 1 ? "" : "s"} before the switchover</span>
        <span><i className="ex-after" /> {monthsAfter} month{monthsAfter === 1 ? "" : "s"} after · switchover {`1 ${label(switchover)}`}</span>
      </div>

      <div className="table-wrap ex-table">
        <table className="cmp-table">
          <thead>
            <tr><th>Income</th><th>The old way</th><th>Where the new rules put it</th></tr>
          </thead>
          <tbody>
            <tr><th>{priorLabel}</th><td>{eur(oldPrior)}</td><td>{eur(earnedBefore)}</td></tr>
            <tr><th>{firstLabel}</th><td>{eur(oldFirst)}</td><td>{eur(earnedAfter)}</td></tr>
          </tbody>
        </table>
      </div>

      {completed ? (
        <div className="callout">
          <strong>Nothing to adjust.</strong> This contract has finished before the switchover, so it's a
          completed contract and stays exactly as it was booked.
        </div>
      ) : adjustment === 0 ? (
        <div className="callout">
          <strong>No adjustment needed.</strong> Spreading a simple subscription over the year already matches
          the new rules. Where differences do appear is in bundles, contract changes and refunds.
        </div>
      ) : (
        <div className="ex-result">
          <div className="ex-figures">
            <div>
              <div className="ex-k">One-off adjustment on 1 {label(switchover)}</div>
              <div className="ex-v ex-neg">−{eur(adjustment)}</div>
              <div className="ex-n">off retained earnings: income already counted that belongs to the new year</div>
            </div>
            <div>
              <div className="ex-k">{firstLabel}</div>
              <div className="ex-v">+{eur(adjustment)}</div>
              <div className="ex-n">more income than the old way would have shown</div>
            </div>
          </div>
          <div className="ex-k ex-journal-label">The journal, dated 1 {label(switchover)}</div>
          <div className="table-wrap">
            <table className="cmp-table ex-journal">
              <thead>
                <tr><th>Account</th><th>Debit</th><th>Credit</th></tr>
              </thead>
              <tbody>
                <tr><th>Retained earnings</th><td>{eur(adjustment)}</td><td></td></tr>
                <tr><th>Deferred income</th><td></td><td>{eur(adjustment)}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="dt-disclaimer">
        Illustrative only: one annual contract paid up front, spread evenly by month, using the modified
        retrospective approach. Real contracts are rarely this tidy — bundles, upgrades, refunds and how
        income was actually booked all change the answer, and the tax effect isn't shown.
      </p>
      <p className="dt-privacy">Runs in your browser. Nothing you enter is sent anywhere or stored.</p>
      <a
        href={whatsappLink(waText)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary btn-primary-blue"
      >
        Run it on your real contracts →
      </a>
    </div>
  );
}
