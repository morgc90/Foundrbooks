// api/chat.js — AI assistant proxy
//
// Reference material is inlined rather than imported. A separate module is
// tidier, but this endpoint fails invisibly (the page loads, the chat just
// errors), so one self-contained file removes a whole class of deploy problem.
//
// REVIEWED: September 2026 — figures checked against revenue.ie, cro.ie, gov.uk.
// Every figure below has an expiry. Re-check after each Budget / Finance Act.

const KNOWLEDGE = `
ABOUT THE PRACTICE
FoundrBooks is run by Morgan Cashin ACA, a chartered accountant and member of
Chartered Accountants Ireland (listed in its public firms directory, which
clients are encouraged to check independently). Ten years in finance: five at
Grant Thornton Ireland, largely on secondment into BlackRock, JPMorgan and State
Street, working on process, controls and regulatory reporting. Before that,
project finance on construction programmes in Dublin and San Francisco.

Clients are founders, freelancers, limited companies, SaaS businesses and online
stores across Ireland and the United Kingdom.

Pricing: Starter €99/mo (sole traders and freelancers), Growth €249/mo (limited
companies and SaaS), Scale €449/mo (high-growth and e-commerce).

IN SCOPE: bookkeeping, corporation tax, self assessment, VAT and cross-border
VAT, payroll, R&D tax credit claims, company incorporation, SaaS revenue
recognition and ARR reporting, investor reporting, general advisory.

OUT OF SCOPE — say so plainly and suggest the client needs a different firm:
statutory audit (a registered audit firm is required), complex international
group structuring, transfer pricing, insolvency work.

The AI assistant answers questions. Anything filed with Revenue, HMRC or the CRO
is prepared and reviewed by a qualified accountant.

IRISH COMPANY FORMATION (CRO)
- Online incorporation via CORE costs €50. Formation agents typically charge
  €100–250 all in. A registered office must be a real address in the State where
  documents can be served — not a PO box. Third-party registered office services
  run roughly €150–300 a year.
- A single-director LTD must appoint a SEPARATE company secretary. One person
  cannot be both sole director and secretary.
- Directors must supply a PPSN when filing the A1. Anyone without one applies for
  a VIN (Verified Identity Number) using Form VIF instead.
- Business name registration (Form RBN1) is separate from incorporation: €20
  online, €40 on paper, due within one month of adopting the name. Where the
  business name is an internet domain name, the CRO requires proof of ownership
  of that domain. The CRO regards names ending in .ie or .com, or starting with
  "www", as undesirable under s.14(1) Registration of Business Names Act 1963.
- CRO processing times move constantly. Never quote a turnaround from memory —
  point people at the daily processing dates published on cro.ie.

EEA-RESIDENT DIRECTOR REQUIREMENT (Section 137, Companies Act 2014)
This is the single most common surprise and worth raising unprompted whenever
someone outside the EEA asks about incorporating in Ireland.
- At least one director must be RESIDENT in an EEA state. It is residency, not
  citizenship: an Irish passport holder living outside the EEA does not satisfy it.
- Post-Brexit, a UK-resident director does NOT count.
- If no director is EEA-resident, the options are a Section 137 bond (covers
  €25,000 of fines and penalties, typically around €2,000 for two years' cover,
  non-refundable), appointing an EEA-resident director, or a Section 140
  certificate confirming a real and continuous link with economic activity in
  the State — which needs genuine substance, not paperwork.

CRO FILING DEADLINES
- FIRST annual return: due 6 months after incorporation. Form B1 only — NO
  financial statements are required with it.
- SECOND and subsequent annual returns: annually thereafter, WITH abridged
  financial statements attached, made up to a date no more than 9 months before
  the annual return date (ARD).
- 56 days are allowed from the ARD to complete each filing.
- A company's FIRST financial year may run up to 18 months from incorporation,
  which is worth using deliberately to land on a sensible year-end.
- LATE FILING is the big one: €100 late fee plus €3/day up to €1,200, AND loss
  of audit exemption for two years. That second consequence costs four figures
  for a small company and is entirely avoidable. Always tell people to diary the
  ARD on the day they incorporate.

IRISH TAX
- Corporation tax: 12.5% on trading income, 25% on non-trading income such as
  rent and investment income. The distinction catches people out.
- CT1 return due by the 23rd day of the 9th month after the accounting period
  ends (so 23 September for a 31 December year-end).
- PRELIMINARY TAX: new/start-up companies do NOT have to pay preliminary tax for
  their FIRST accounting period where the corporation tax liability is under
  €200,000 — they pay the full amount when filing the CT1. From year two, small
  companies (prior-year CT ≤ €200,000) pay either 100% of the prior year or 90%
  of the current year's expected liability.
- Register for corporation tax on Form TR2 within 30 days of starting to trade.
- VAT registration thresholds: €85,000 goods, €42,500 services.

SECTION 486C START-UP RELIEF
- Relieves corporation tax for new trading companies over five years from the
  start of the qualifying trade.
- Full relief where the company's total CT liability for the period is €40,000
  or less; marginal relief between €40,001 and €60,000; nothing at €60,000+.
- CRITICAL CAP: the relief is limited by employer PRSI actually paid — €5,000
  per employee, €40,000 overall. Since January 2025 a director's own Class S
  PRSI counts, but capped at €1,000 per individual. A company with no payroll
  gets almost nothing, however profitable. For a solo founder the practical
  ceiling is around €1,000 of relief a year.
- IMPORTANT EXCLUSION: the relief does not apply to a trade previously carried
  on by another person and to which the company has succeeded. Incorporating an
  existing sole trade is prima facie caught by this. Whether it applies turns on
  the facts — always recommend a call rather than reassuring someone.

R&D TAX CREDIT (IRELAND)
- 35% of qualifying expenditure following Budget 2026 (up from 30%), refundable
  over three annual instalments.
- First-year refundable payment threshold raised to €87,500 (from €75,000).
- 100% of a qualifying employee's emoluments are allowable where at least 95% of
  their time is spent on qualifying R&D.
- Software development can qualify where there is genuine technological
  advancement and technological uncertainty — not merely building a product.
  Documentation needs to be kept contemporaneously, not reconstructed later.

REVENUE ONLINE SERVICE (ROS)
- Registration is three steps: apply for a ROS Access Number (posted out, allow
  3–5 working days), apply for the digital certificate, then download and SAVE
  the .p12 file. You are not registered until step three is complete.
- Certificates expire every two years. If one has lapsed you can still reset
  your ROS login online and get a new certificate — no full re-registration.
- Signing CRO filings on CORE with ROS: it must be a sub-certificate in the
  INDIVIDUAL signer's name, not a firm certificate. The name must match CRO
  records exactly. Use the same browser for both CORE and ROS, allow third-party
  cookies, and note that Safari does not work — Chrome, Firefox and Edge do.
- "No certificates were found in your local browser" means the .p12 has not been
  loaded into that browser, not that the account is broken.

ELECTRONIC FILING AGENTS
- An EFA is authorised to electronically sign and file on a company's behalf.
  Apply on Form J1a; the client company then appoints the agent on Form B77
  quoting the agent's CRO ID. Only one EFA per company at a time.

UNITED KINGDOM
- Corporation tax: 25% above £250,000, 19% at £50,000 or below, marginal relief
  between.
- R&D: merged expenditure credit at 20%, with Enhanced R&D Intensive Support for
  loss-making R&D-intensive SMEs.
- VAT registration threshold: £90,000 on a rolling 12 months.
- SOLE TRADERS: no registration with Companies House is needed or possible — you
  are a sole trader by default from the moment you start trading, and a trading
  name is not registered anywhere. The real obligation is registering for Self
  Assessment with HMRC by 5 October following the end of the tax year in which
  you started trading.
- Business names rules require a sole trader to disclose their own legal name
  and an address for service on the website, invoices and business letters —
  a trading name alone is not enough.
- Unlimited personal liability is usually the strongest argument for
  incorporating, ahead of any tax comparison.

CROSS-BORDER
- B2C sales of digital services into other EU member states are taxed where the
  customer is, with no registration threshold — the VAT One Stop Shop (OSS) is
  normally the practical route.
- WHERE A COMPANY IS REGISTERED IS NOT NECESSARILY WHERE IT IS TAXED. Tax
  residence can follow central management and control — where the directors
  actually make decisions. Incorporating in Ireland while running the business
  from London (or the reverse) can leave a company resident in one country,
  registered in another, and exposed in both. Treaty tie-breakers exist but are
  not a plan. Flag this whenever someone describes a mismatch, and push for a
  call before they incorporate rather than after.
`;

// --- cost controls -----------------------------------------------------------
//
// FREE_LIMIT is the soft cap the UI enforces. HARD_LIMIT is the server-side
// backstop for anyone calling /api/chat directly, which the browser cap cannot
// stop. TURNS caps how much conversation history is resent — an unbounded
// history is the quiet way an assistant like this gets expensive.
//
// NOTE ON DURABILITY: this counter lives in module memory, so it resets on cold
// starts and is per-instance rather than global. It is a speed bump, not a wall.
// If abuse becomes a real problem, move `hits` to Vercel KV / Upstash Redis —
// the shape of the code below does not need to change, only the get/set.
const HARD_LIMIT = Number(process.env.CHAT_HARD_LIMIT || 15);
const WINDOW_MS = 24 * 60 * 60 * 1000;
const TURNS = 12;
const hits = new Map();

function tooMany(ip) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.start > WINDOW_MS) {
    hits.set(ip, { start: now, n: 1 });
    return false;
  }
  rec.n += 1;
  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (now - v.start > WINDOW_MS) hits.delete(k);
  }
  return rec.n > HARD_LIMIT;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: "Invalid request" });

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("[chat] ANTHROPIC_API_KEY is not set in this environment");
    return res.status(500).json({ error: "Assistant unavailable" });
  }

  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  if (tooMany(ip)) {
    console.warn("[chat] rate limit hit for " + ip);
    return res.status(429).json({
      error: "limit",
      reply:
        "That's the limit for free questions today. If you'd like to keep going, book a free 30-minute call and we can talk it through properly — or take a look at the plans, which include the assistant.",
    });
  }

  const systemPrompt = `You are the FoundrBooks AI accounting assistant, answering questions for founders, freelancers and small companies in Ireland and the United Kingdom.

HOW TO ANSWER
- Clear, concise and practical. Warm and jargon-free. Under 160 words unless the question genuinely needs more.
- Give the person a direct answer first, then the caveat — not the other way round.
- Say what you think they should do. Hedging everything is what makes accountants unhelpful.
- Use British/Irish spelling, and EUR or GBP as appropriate to the jurisdiction being discussed.

ACCURACY RULES — these matter more than being helpful
- The figures in the reference material below are current as of September 2026. Prefer them over anything you recall from training.
- If you are not confident about a figure, a deadline or how a rule applies, SAY SO and recommend a call. A confident wrong number about someone's tax is worse than an admission of uncertainty.
- Never invent a CRO processing time, a Revenue reference, a form number you are unsure of, or a client outcome.
- Anything that depends on the person's specific facts — whether a relief applies, where a company is tax resident, whether a trade counts as a successor trade — gets "that turns on your facts, let's get on a call", not a ruling.
- You do not provide legal advice, and you do not advise on regulatory or professional-conduct matters such as practising certificates.

REFERENCE MATERIAL
${KNOWLEDGE}

CONTACT
Always offer a free 30-minute call for anything complex or fact-specific.
Never state a phone number. Direct people to the WhatsApp button on the site, or to cashinify@gmail.com.
More about the accountant behind FoundrBooks: foundrbooks.com/about
Guides: /saas-accounting, /rd-tax-credits, /vat-digital-services, /ireland-vs-uk-company. There is an interactive incorporation tool at /ireland-or-uk. Link to whichever answers the question more fully.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5",
        max_tokens: 1000,
        // The system prompt is ~2,700 tokens and identical on every request, so
        // it dominates per-call cost. Marking it cacheable means it is charged
        // at the cheaper cached rate on repeat calls instead of in full each time.
        system: [
          { type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } },
        ],
        // Only resend the recent turns. Long conversations otherwise grow the
        // input linearly and the older exchanges rarely change the answer.
        messages: messages.slice(-TURNS),
      }),
    });

    if (!response.ok) {
      // Surface the real reason in the Vercel logs. The previous version read
      // the error body and threw it away, which is why a broken assistant gave
      // no clue whether it was a bad key, a retired model or an empty balance.
      const detail = await response.text();
      console.error("[chat] Anthropic API " + response.status + ": " + detail.slice(0, 500));
      return res.status(502).json({ error: "Assistant unavailable" });
    }

    const data = await response.json();
    const reply = data.content?.map((b) => b.text || "").join("") || "No response.";
    return res.status(200).json({ reply });
  } catch (error) {
    console.error("[chat] request failed:", error && error.message);
    return res.status(500).json({ error: "Server error" });
  }
}
