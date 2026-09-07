// src/decisionTools.js
//
// Data behind the interactive decision tools. The <DecisionTool> component is
// generic — to add another tool (VAT registration, R&D eligibility) you write a
// new object here and a route, and write no new component code.
//
// Scoring model: each option carries weights against named outcomes. Weights are
// summed, and the highest total wins. `flags` raise notes that appear in the
// result regardless of which outcome wins — that is where the genuinely
// important caveats live, because the caveats are usually what matter more than
// the recommendation itself.
//
// REVIEWED: September 2026. Tax figures cross-checked against revenue.ie and
// gov.uk. Re-check after each Budget / Finance Act.

export const IRELAND_VS_UK = {
  slug: "/ireland-or-uk",
  badge: "5 questions · about a minute",
  title: "Ireland or the UK?",
  intro:
    "Where you incorporate changes your tax rate, your filing burden and, occasionally, whether you get taxed twice. Answer five questions and you'll get a reasoned view rather than a headline rate.",
  outcomes: {
    ireland: "Ireland",
    uk: "United Kingdom",
  },

  // Margin below which the result is reported as "genuinely close" rather than
  // as a recommendation. Keeps the tool honest when the answers are ambiguous.
  closeMargin: 3,

  questions: [
    {
      id: "control",
      q: "Where will board decisions actually be made?",
      help:
        "Not where you'll register — where you and any co-directors will physically be when you decide things.",
      options: [
        { label: "Ireland", weights: { ireland: 4 } },
        { label: "United Kingdom", weights: { uk: 4 } },
        { label: "Split between both", weights: {}, flags: ["split_control"] },
        { label: "Somewhere else entirely", weights: {}, flags: ["outside_control"] },
      ],
    },
    {
      id: "profit",
      q: "What trading profits do you expect in the first three years?",
      help: "A rough annual figure once you're past the earliest stage.",
      options: [
        { label: "Under €50,000 / £50,000", weights: { uk: 1 } },
        { label: "€50,000 – €250,000", weights: { ireland: 2 } },
        { label: "Above €250,000", weights: { ireland: 3 } },
        { label: "No idea yet", weights: {} },
      ],
    },
    {
      id: "rd",
      q: "Will you spend meaningfully on product or technical development?",
      help:
        "Salaries for engineers, or contracted development work, where you're solving problems without an off-the-shelf answer.",
      options: [
        { label: "Yes, it's most of our spend", weights: { ireland: 3 }, flags: ["rd_strong"] },
        { label: "Some, but not the main cost", weights: { ireland: 1 } },
        { label: "No, we're not building anything technical", weights: {} },
      ],
    },
    {
      id: "eea",
      q: "Is at least one director resident in an EEA country?",
      help:
        "Residence, not citizenship. Post-Brexit, a UK-resident director does not count as EEA.",
      options: [
        { label: "Yes", weights: { ireland: 1 } },
        { label: "No", weights: { uk: 2 }, flags: ["needs_bond"] },
        { label: "Not sure", weights: {}, flags: ["needs_bond"] },
      ],
    },
    {
      id: "market",
      q: "Where are your customers and investors, mostly?",
      options: [
        { label: "Ireland or the wider EU", weights: { ireland: 2 } },
        { label: "United Kingdom", weights: { uk: 2 } },
        { label: "United States", weights: { ireland: 1 }, flags: ["us_market"] },
        { label: "Spread across several", weights: {} },
      ],
    },
  ],

  // Shown under the recommendation when the corresponding flag was raised.
  notes: {
    split_control: {
      tone: "warn",
      title: "This is the one to get right.",
      body:
        "You said decisions will be split across both countries. A company's tax residence can follow where it is centrally managed and controlled, not where it is registered — so a split board can leave a company resident in one country, registered in another, and exposed in both. Treaty tie-breakers exist, but relying on them is not a plan. Take advice before you incorporate rather than after the first return falls due.",
    },
    outside_control: {
      tone: "warn",
      title: "Where you'll be sitting matters more than where you register.",
      body:
        "Running an Irish or UK company from a third country raises both tax residence and, potentially, permanent establishment questions in that country. This tool can't answer it, and a wrong assumption here is expensive to unwind. Worth a conversation before you file anything.",
    },
    needs_bond: {
      tone: "plain",
      title: "The EEA director requirement applies to you.",
      body:
        "An Irish company needs at least one EEA-resident director under Section 137 of the Companies Act 2014. Without one you'd need a bond covering €25,000 of fines and penalties — typically around €2,000 for two years and non-refundable — or a Section 140 certificate showing a real and continuous link with economic activity in the State. Neither is fatal, but both are cost and friction the UK route doesn't have.",
    },
    rd_strong: {
      tone: "plain",
      title: "The R&D credit is probably your biggest single number.",
      body:
        "Ireland's R&D tax credit rose to 35% of qualifying expenditure in Budget 2026, refundable over three instalments, with the first-year refundable threshold now €87,500. The UK's merged expenditure credit sits at 20%, with enhanced support for loss-making R&D-intensive SMEs. If development really is most of your spend, that gap is worth more than the headline corporation tax difference.",
    },
    us_market: {
      tone: "plain",
      title: "A note on US investors.",
      body:
        "US venture investors are generally comfortable with Irish and UK companies, but many will eventually want a Delaware holding company on top. That's normal and not a reason to pick differently now — just don't build an elaborate structure early to pre-empt it.",
    },
  },

  results: {
    ireland: {
      headline: "Ireland looks like the stronger fit.",
      body:
        "Ireland charges 12.5% corporation tax on trading income against the UK's 25% above £250,000, and the 35% R&D credit is the most generous of the two regimes. Section 486C start-up relief can reduce corporation tax to nil where the total liability is €40,000 or less — though it's capped by the employer PRSI you actually pay, so it's worth little until you're running payroll. You're also inside the EU single market, which matters if your customers are.",
    },
    uk: {
      headline: "The UK looks like the stronger fit.",
      body:
        "Tax residence should follow where decisions are made, and the UK route avoids the EEA-director requirement entirely. At modest profits the 19% small profits rate is close enough to Ireland's 12.5% that the difference rarely justifies the extra friction, and incorporation is cheaper and faster. If your customers, investors and hiring market are British, that alignment is worth more than a few points of corporation tax.",
    },
    tie: {
      headline: "It's genuinely close.",
      body:
        "Your answers don't point clearly either way, which usually means the decision turns on something this tool can't weigh — where you want to live, where you'll hire, or what your investors expect. When it's this balanced, the practical advice is to follow where you'll actually be running the business from, because tax residence tends to follow that anyway.",
    },
  },

  disclaimer:
    "This is a guide, not advice. It weighs common factors but can't see your full circumstances, and the residence question in particular turns on facts this tool doesn't ask about. Nothing here creates a client relationship.",

  cta: {
    heading: "Want a second opinion on this?",
    sub: "Thirty minutes, no charge. Bring your answers and I'll tell you what I'd actually do in your position.",
    subject: "Ireland vs UK incorporation — free 30-min call",
  },

  related: { to: "/ireland-vs-uk-company", label: "Read the full comparison guide" },
};
