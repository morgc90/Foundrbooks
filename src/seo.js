// Single source of truth for per-route SEO metadata.
// Consumed by:
//   - src/components/Seo.jsx      (client-side / SPA navigation)
//   - scripts/prerender.mjs       (build-time HTML injection)
//
// Tax figures verified against revenue.ie, cro.ie and gov.uk in August 2026.
// Re-check after each Budget / Finance Act before publishing changes.

import { GOOGLE_PROFILE } from "./data";

export const SITE = "https://foundrbooks.com";
export const OG_IMAGE = `${SITE}/og-image.png`;

const CAI_DIRECTORY =
  "https://www.charteredaccountants.ie/Find-a-Firm/Firms-Directory?type=members&country=98&city=dublin&memberName=morgan%20cashin";
// Google Business Profile entity for FoundrBooks.
// Feature ID 0x65d074cc8b461387:0xfe9137296501e28b -> CID 18343503408184550027.
// Links the site to the Maps listing so Google treats them as one entity.
const GBP_LISTING = GOOGLE_PROFILE.url;

const CONTACT_EMAIL = "cashinify@gmail.com";

const ORGANISATION = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "FoundrBooks",
  description:
    "AI-powered accounting for UK and Irish founders and startups. Chartered accountant specialising in limited companies, SaaS businesses, and early-stage companies.",
  url: SITE,
  email: CONTACT_EMAIL,
  areaServed: ["GB", "IE"],
  priceRange: "€€",
  currenciesAccepted: "EUR",
  hasCredential: [
    "ACA — member of Chartered Accountants Ireland",
    "Xero associate certified",
    "Xero professional certified",
    "A2X Certification for Accountants and Bookkeepers",
  ],
  founder: { "@type": "Person", name: "Morgan Cashin" },
  memberOf: [
    { "@type": "Organization", name: "Chartered Accountants Ireland" },
    { "@type": "Organization", name: "Xero Partner Programme" },
  ],
  sameAs: [CAI_DIRECTORY, GBP_LISTING],
  knowsAbout: [
    "UK Corporation Tax",
    "Irish Corporation Tax",
    "Self Assessment",
    "VAT Registration UK",
    "VAT Registration Ireland",
    "VAT One Stop Shop",
    "Startup Accounting",
    "SaaS Finance",
    "SaaS Revenue Recognition",
    "FRS 102 Section 23",
    "Xero",
    "Shopify accounting",
    "Amazon seller accounting",
    "Limited Company Accounting",
    "R&D Tax Credits",
    "Company Incorporation Ireland",
  ],
  offers: [
    { "@type": "Offer", name: "Starter", price: "99", priceCurrency: "EUR" },
    { "@type": "Offer", name: "Growth", price: "249", priceCurrency: "EUR" },
    { "@type": "Offer", name: "Scale", price: "449", priceCurrency: "EUR" },
  ],
};

const faqPage = (items) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

const service = (name, serviceType, description, path) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  serviceType,
  description,
  url: `${SITE}${path}`,
  areaServed: ["IE", "GB"],
  provider: ORGANISATION,
});

export const HOME_FAQ = [
  {
    q: "Do I need an accountant for my UK startup?",
    a: "Yes — UK limited companies are legally required to file annual accounts and a corporation tax return with HMRC. An accountant ensures compliance, maximises allowable expenses, and typically saves far more than their fee.",
  },
  {
    q: "Do I need an accountant for my Irish startup?",
    a: "Yes — Irish limited companies must file annual accounts with the CRO and a corporation tax return with Revenue. Ireland's 12.5% corporation tax rate on trading income is one of Europe's lowest, making proper tax planning especially valuable for startups.",
  },
  {
    q: "How much does a startup accountant cost?",
    a: "FoundrBooks pricing starts from €99/month for sole traders and freelancers, €249/month for limited companies and SaaS businesses, and €449/month for high-growth and e-commerce businesses. All plans include bookkeeping, tax returns, and an AI tax assistant.",
  },
  {
    q: "What is the corporation tax rate in Ireland for startups?",
    a: "Ireland charges 12.5% corporation tax on trading income and 25% on non-trading income such as rental and investment income. New start-up companies may also qualify for relief under Section 486C, which can reduce corporation tax to nil where the liability is €40,000 or less.",
  },
  {
    q: "Am I better off as a sole trader or limited company in the UK?",
    a: "As a sole trader you pay income tax on all profits at 20–45%. As a limited company you can take a salary plus dividends, which is often more tax efficient once profits rise, though the right answer depends on your profit level, how much you need to draw, and your plans for the business.",
  },
  {
    q: "When do I need to register for VAT?",
    a: "In the UK you must register once taxable turnover exceeds £90,000 in any rolling 12-month period. In Ireland the registration thresholds are €85,000 for the supply of goods and €42,500 for the supply of services.",
  },
  {
    q: "Can FoundrBooks help with R&D tax credits?",
    a: "Yes. Ireland's R&D tax credit is 35% of qualifying expenditure following Budget 2026 and is refundable over three annual instalments. In the UK, the merged R&D expenditure credit is 20%, and loss-making R&D-intensive SMEs may instead qualify for Enhanced R&D Intensive Support. FoundrBooks assesses eligibility and prepares the claim.",
  },
];

export const SAAS_FAQ = [
  {
    q: "Do you work with pre-revenue SaaS companies?",
    a: "Yes, and it is usually the best time to start. Setting up your chart of accounts and revenue recognition policy correctly from the beginning costs far less than reconstructing two years of books before a funding round.",
  },
  {
    q: "We use Stripe. Can you work from that directly?",
    a: "Yes. We reconcile Stripe, Paddle, GoCardless and Chargebee data directly, including processor fees, refunds, chargebacks and payout timing differences.",
  },
  {
    q: "What is deferred revenue in a SaaS business?",
    a: "When a customer pays for an annual subscription up front, you have not yet earned that money. The unearned portion is a liability on your balance sheet called deferred revenue, and it is released to the profit and loss account month by month as you deliver the service.",
  },
  {
    q: "Why doesn't our ARR match the revenue in our accounts?",
    a: "They measure different things and they will not match. ARR annualises your current contracted recurring revenue at a point in time, while recognised revenue reflects the service actually delivered in the period under IFRS 15 or FRS 102. Both are valid metrics; the mistake is presenting one as the other.",
  },
  {
    q: "Can a SaaS company claim R&D tax credits?",
    a: "Often yes, where development work resolves genuine technical uncertainty rather than applying established techniques. Ireland's R&D tax credit is 35% of qualifying expenditure following Budget 2026. In the UK the merged R&D expenditure credit is 20%, with Enhanced R&D Intensive Support available to loss-making SMEs whose qualifying R&D is at least 30% of total expenditure.",
  },
  {
    q: "When do we need to worry about VAT on cross-border SaaS sales?",
    a: "For B2B sales within the EU and to the UK, the customer generally accounts for VAT under the reverse charge. For B2C sales, VAT is due at the customer's local rate, though a business established in one member state can charge its domestic rate while cross-border B2C supplies of digital services stay under €10,000 per year. Above that, the One Stop Shop lets you file a single return instead of registering in each country.",
  },
];

export const RD_FAQ = [
  {
    q: "How much is the R&D tax credit worth in Ireland?",
    a: "Following Budget 2026 the Irish R&D Corporation Tax Credit is 35% of qualifying expenditure, up from 30%. It is refundable in cash over three annual instalments even if your company is loss-making, and the first-year payment threshold increased from €75,000 to €87,500.",
  },
  {
    q: "How much is the R&D tax credit worth in the UK?",
    a: "For accounting periods beginning on or after 1 April 2024 the UK operates a merged R&D expenditure credit at 20%. Loss-making, R&D-intensive SMEs may instead claim Enhanced R&D Intensive Support, which gives an additional 86% deduction on qualifying costs and a payable credit worth up to 14.5% of the surrenderable loss.",
  },
  {
    q: "What counts as R&D-intensive in the UK?",
    a: "A company qualifies as R&D-intensive where its relevant R&D expenditure is at least 30% of its total expenditure. Many early-stage software and product companies clear this comfortably because development is their largest cost.",
  },
  {
    q: "Does software development qualify for R&D relief?",
    a: "Only where it seeks to resolve genuine scientific or technological uncertainty that a competent professional in the field could not readily deduce. Building a conventional web application or integrating documented APIs is not R&D. Novel algorithms, significant performance or scalability problems, and work where the technical outcome was genuinely uncertain often are.",
  },
  {
    q: "Can a loss-making company still claim?",
    a: "Yes, and it is often where the relief matters most. Ireland's credit is repayable in cash over three annual instalments regardless of whether corporation tax is payable. In the UK, Enhanced R&D Intensive Support provides a payable credit to loss-making R&D-intensive SMEs.",
  },
  {
    q: "How risky is an R&D claim?",
    a: "HMRC has sharply increased its scrutiny of software claims in recent years, and a weak or generic technical narrative invites an enquiry. A well-documented claim tied to specific technical uncertainties, with contemporaneous records of the work, is a very different proposition from a speculative one.",
  },
];

export const VAT_FAQ = [
  {
    q: "When do I have to register for VAT in Ireland?",
    a: "The Irish VAT registration thresholds are €85,000 for the supply of goods and €42,500 for the supply of services, measured over a twelve-month period. Most software and consulting businesses fall under the services threshold.",
  },
  {
    q: "When do I have to register for VAT in the UK?",
    a: "You must register once your total taxable turnover exceeds £90,000 in any rolling twelve-month period.",
  },
  {
    q: "Do I charge VAT to business customers in other EU countries?",
    a: "Generally no. Under the standard B2B place-of-supply rule the customer accounts for the VAT themselves under the reverse charge, provided you hold and can evidence a valid VAT number for them.",
  },
  {
    q: "What is the €10,000 threshold for digital services?",
    a: "If you are established in a single EU member state and your cross-border B2C supplies of telecommunications, broadcasting and electronic services stay below €10,000 in both the current and preceding calendar year, you can charge your own domestic VAT rate. Once you exceed it, the general place-of-supply rules apply to all supplies from that point forward.",
  },
  {
    q: "What is the One Stop Shop?",
    a: "The One Stop Shop (OSS) lets you account for VAT due on cross-border B2C supplies across the EU through a single registration and a single return in one member state, instead of registering for VAT in every country where you have consumers.",
  },
  {
    q: "How do UK businesses handle VAT on digital sales to EU consumers?",
    a: "Since Brexit, a UK business selling digital services to EU consumers must either register for the non-Union OSS scheme in an EU member state or register for VAT in each member state where it has consumers. The €10,000 threshold is not available to businesses established outside the EU.",
  },
  {
    q: "What evidence do I need for a customer's location?",
    a: "You need supporting evidence such as the customer's billing address, the IP address of the device used, their bank details, or the country code of their SIM card. Where a payment service provider is involved, two non-contradictory pieces of information — for example a billing address plus the country code from the payment provider — are generally sufficient.",
  },
];

export const INCORPORATION_FAQ = [
  {
    q: "Is corporation tax lower in Ireland or the UK?",
    a: "Ireland charges 12.5% on trading income and 25% on non-trading income. The UK charges 25% where profits exceed £250,000, 19% where they are £50,000 or less, and applies marginal relief in between. At higher profit levels Ireland's trading rate is materially lower, but the rate is only one input into the decision.",
  },
  {
    q: "Does an Irish company need an Irish director?",
    a: "Under Section 137 of the Companies Act 2014 an Irish company must have at least one director resident in an EEA member state; an alternate director does not satisfy this. If no director is EEA-resident, the company must either hold a €25,000 bond valid for at least two years or obtain a Section 140 certificate from the Registrar confirming a real and continuous link with economic activity in the State.",
  },
  {
    q: "What tax relief is available for new Irish companies?",
    a: "Section 486C relief can reduce corporation tax to nil for a new start-up company where its total corporation tax liability for the period does not exceed €40,000, with marginal relief between €40,000 and €60,000 and no relief at €60,000 or above. The relief runs across a five-year period from the start of the qualifying trade and is capped by the employer PRSI paid, at €5,000 per employee or director and €40,000 overall.",
  },
  {
    q: "Can I run a UK company from Ireland, or an Irish company from the UK?",
    a: "You can, but where a company is centrally managed and controlled can determine where it is tax resident, and getting this wrong risks being taxable in both jurisdictions. If the directors and decision-making sit in one country while the company is registered in another, take advice before incorporating rather than after.",
  },
  {
    q: "Which is cheaper to run?",
    a: "UK incorporation and ongoing filing at Companies House is generally cheaper and faster than the Irish CRO equivalent, and there is no bond requirement. Ireland's advantages are the 12.5% trading rate, start-up relief, the 35% R&D credit and EU membership. The cheaper option and the better option are frequently not the same one.",
  },
];

// The named professional behind the practice. Google's quality guidance leans
// heavily on identifiable, verifiable authorship for finance topics, so the
// About page carries a Person entity linked back to the organisation.
export const FRS102_FAQ = [
  {
    q: "What is FRS 102 Section 23?",
    a: "Section 23 is the part of FRS 102 that sets out when a company recognises revenue from its customers. It has been replaced in full, for accounting periods beginning on or after 1 January 2026, by a five-step model adapted from IFRS 15: income is recognised as the company delivers what it promised, rather than when an invoice is raised.",
  },
  {
    q: "When do the new Section 23 rules apply?",
    a: "For accounting periods beginning on or after 1 January 2026. For a company with a 31 December year end, the first affected year is the one ending 31 December 2026. For other year ends it is the first year that starts during 2026, so a 31 March year end is first affected in the year to 31 March 2027. Early adoption is permitted.",
  },
  {
    q: "Do the changes apply to small companies?",
    a: "Yes. They apply to all companies preparing accounts under FRS 102, including small companies using Section 1A, in both Ireland and the UK.",
  },
  {
    q: "What about micro-entities using FRS 105?",
    a: "FRS 105 moves to a simplified version of the same five-step model for accounting periods beginning on or after 1 January 2026, with its own, simpler switchover rules. It is worth checking how those apply to the contracts you already have.",
  },
  {
    q: "Will Section 23 change my tax bill?",
    a: "It can change which year profit falls into, which can change when tax is paid, and the one-off switchover adjustment can have tax consequences of its own. The cash your business receives is unchanged. The tax position depends on your circumstances and is worth planning before your first affected year end.",
  },
  {
    q: "What is the difference between the modified and full retrospective approaches?",
    a: "Under the modified retrospective approach, last year's figures are left as they were and the cumulative effect of the change is recorded as an adjustment to retained earnings at the start of the first affected year, for contracts not completed at that date. Under the full retrospective approach, last year's figures are restated as if the new rules had always applied. Most smaller companies choose the modified approach.",
  },
  {
    q: "We invoice after we deliver. Are we affected?",
    a: "Probably very little. The new rules mostly move income that is paid for in advance of delivery. If you invoice after the work is done and little runs across your year end, your figures may barely change, though bundled sales and long projects are still worth checking.",
  },
];

const PERSON = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Morgan Cashin",
  givenName: "Morgan",
  familyName: "Cashin",
  jobTitle: "Chartered Accountant (ACA)",
  description:
    "Chartered accountant and founder of FoundrBooks. Ten years in finance including five years at Grant Thornton Ireland on secondment into BlackRock, JPMorgan and State Street.",
  url: `${SITE}/about`,
  image: `${SITE}/morgan-cashin.jpg`,
  email: CONTACT_EMAIL,
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Professional certification",
    name: "ACA — Chartered Accountant",
    recognizedBy: { "@type": "Organization", name: "Chartered Accountants Ireland" },
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "UCD Michael Smurfit Graduate Business School" },
    { "@type": "CollegeOrUniversity", name: "Technological University Dublin" },
  ],
  worksFor: { "@type": "Organization", name: "FoundrBooks", url: SITE },
  knowsAbout: [
    "Startup Accounting",
    "SaaS Revenue Recognition",
    "FRS 102 Section 23",
    "Xero",
    "Shopify accounting",
    "Amazon seller accounting",
    "R&D Tax Credits",
    "Irish Corporation Tax",
    "UK Corporation Tax",
    "Company Incorporation Ireland",
  ],
  sameAs: [CAI_DIRECTORY, GBP_LISTING],
};

const ABOUT_FAQ = [
  {
    q: "Who runs FoundrBooks?",
    a: "FoundrBooks is run by Morgan Cashin, a chartered accountant (ACA) qualified with Chartered Accountants Ireland and listed in its firms directory. He qualified in 2023 after five years at Grant Thornton Ireland, working largely on secondment into BlackRock, JPMorgan and State Street.",
  },
  {
    q: "Is my work done by a qualified accountant or by AI?",
    a: "Both, with a clear line between them. The AI assistant answers questions instantly, at any hour. Everything filed with Revenue, HMRC or the Companies Registration Office is prepared and reviewed by a qualified chartered accountant.",
  },
  {
    q: "Can I verify the qualification?",
    a: "Yes, and you should. Morgan Cashin is listed in the Chartered Accountants Ireland firms directory, which is publicly searchable and independent of this website.",
  },
  {
    q: "Does FoundrBooks carry out audits?",
    a: "No. FoundrBooks is a small practice providing accounting, tax and advisory services. If your company reaches a size where a statutory audit is required, you will need a registered audit firm.",
  },
];

export const ROUTES = {
  "/": {
    title: "FoundrBooks — Accounting for UK & Irish Founders and Startups | ACA Qualified",
    description:
      "FoundrBooks is an AI-powered accounting service for UK and Irish founders and startups. Chartered accountant, instant AI tax assistant, transparent pricing. Specialists in limited companies, SaaS, and early-stage businesses.",
    ogTitle: "FoundrBooks — Accounting for UK & Irish Founders and Startups",
    ogDescription:
      "Chartered accounting with a live AI tax assistant. Built for UK and Irish founders, startups, and limited companies. Transparent monthly pricing, no surprises.",
    keywords:
      "accounting for startups UK, accountant for founders UK, accountant for startups Ireland, limited company accountant UK, startup accountant Ireland, chartered accountant Dublin, AI accounting UK Ireland, corporation tax UK startup, VAT registration Ireland, SaaS accountant UK, R&D tax credits UK Ireland",
    jsonLd: [ORGANISATION, faqPage(HOME_FAQ)],
    changefreq: "weekly",
    priority: "1.0",
  },

  "/about": {
    title: "About FoundrBooks — Morgan Cashin, Chartered Accountant (ACA)",
    description:
      "Meet the chartered accountant behind FoundrBooks. ACA qualified with Chartered Accountants Ireland, ten years in finance including Grant Thornton, BlackRock and JPMorgan. Accounting for founders in Ireland and the UK.",
    ogTitle: "About FoundrBooks — Morgan Cashin, Chartered Accountant",
    ogDescription:
      "One chartered accountant, a decade of finance experience, and software built to remove the parts of the job that never needed a human.",
    keywords:
      "Morgan Cashin accountant, chartered accountant Ireland, ACA accountant Dublin, about FoundrBooks, accountant for founders Ireland, qualified accountant UK Ireland",
    jsonLd: [PERSON, faqPage(ABOUT_FAQ)],
    changefreq: "monthly",
    priority: "0.8",
  },

  "/saas-accounting": {
    title: "SaaS Accounting for Irish & UK Software Companies | FoundrBooks",
    description:
      "Specialist accountants for SaaS founders in Ireland and the UK. Revenue recognition, deferred revenue, ARR reporting, R&D tax credits and VAT OSS — from €99/month.",
    ogTitle: "SaaS Accounting for Irish & UK Software Companies",
    ogDescription:
      "Chartered accountants for subscription software businesses. IFRS 15 revenue recognition, deferred revenue schedules, ARR reporting, R&D credits and cross-border VAT.",
    keywords:
      "SaaS accountant Ireland, SaaS accounting UK, accountants for software companies, SaaS revenue recognition Ireland, deferred revenue SaaS, R&D tax credits SaaS, ARR reporting accountant, IFRS 15 SaaS",
    jsonLd: [
      service(
        "SaaS Accounting",
        "Accounting and financial reporting for subscription software businesses",
        "Specialist accounting for SaaS companies in Ireland and the UK: IFRS 15 revenue recognition, deferred revenue schedules, payment processor reconciliation, ARR and MRR reporting, R&D tax credit claims and cross-border VAT.",
        "/saas-accounting"
      ),
      faqPage(SAAS_FAQ),
    ],
    changefreq: "monthly",
    priority: "0.9",
  },

  "/rd-tax-credits": {
    title: "R&D Tax Credits Ireland & UK — 35% Refundable Credit | FoundrBooks",
    description:
      "R&D tax credit claims for Irish and UK companies. Ireland's credit is 35% and refundable in cash; the UK merged RDEC is 20%. What qualifies, what it's worth, and how to claim.",
    ogTitle: "R&D Tax Credits for Irish & UK Companies",
    ogDescription:
      "Ireland's R&D credit is 35% of qualifying spend and refundable even when loss-making. The UK merged RDEC is 20%, with enhanced support for R&D-intensive SMEs.",
    keywords:
      "R&D tax credits Ireland, R&D tax credits UK, R&D tax credit software company, merged RDEC, enhanced R&D intensive support, ERIS, R&D claim accountant Ireland, research and development tax credit 35%",
    jsonLd: [
      service(
        "R&D Tax Credit Claims",
        "Research and development tax relief claims for Irish and UK companies",
        "Assessment, technical narrative and filing of R&D tax credit claims under Ireland's 35% R&D Corporation Tax Credit and the UK's merged R&D expenditure credit and Enhanced R&D Intensive Support.",
        "/rd-tax-credits"
      ),
      faqPage(RD_FAQ),
    ],
    changefreq: "monthly",
    priority: "0.9",
  },

  "/vat-digital-services": {
    title: "VAT on Digital Services — OSS, Reverse Charge, UK & EU | FoundrBooks",
    description:
      "VAT for online and digital businesses selling across the UK and EU. Registration thresholds, B2B reverse charge, the €10,000 B2C threshold, and One Stop Shop registration.",
    ogTitle: "VAT on Digital Services for UK & Irish Businesses",
    ogDescription:
      "Place of supply, the reverse charge, the €10,000 threshold and the One Stop Shop — explained for founders selling software and digital products cross-border.",
    keywords:
      "VAT digital services, One Stop Shop VAT, OSS registration Ireland, VAT MOSS UK, reverse charge VAT EU, VAT threshold Ireland, VAT registration UK 90000, electronically supplied services VAT",
    jsonLd: [
      service(
        "VAT and Cross-Border Compliance",
        "VAT registration, filing and One Stop Shop compliance for digital businesses",
        "VAT registration and filing for UK and Irish businesses selling digital services cross-border, including One Stop Shop registration, reverse charge treatment and customer location evidence.",
        "/vat-digital-services"
      ),
      faqPage(VAT_FAQ),
    ],
    changefreq: "monthly",
    priority: "0.8",
  },

  "/ireland-vs-uk-company": {
    title: "Ireland vs UK: Where Should Founders Incorporate? | FoundrBooks",
    description:
      "Corporation tax rates, start-up relief, director residency rules and filing costs compared. An honest look at whether to incorporate your company in Ireland or the UK.",
    ogTitle: "Ireland vs UK — Where Should Founders Incorporate?",
    ogDescription:
      "12.5% vs 25%, Section 486C start-up relief, the EEA director requirement and the €25,000 bond. What actually drives the decision.",
    keywords:
      "incorporate Ireland or UK, Irish company vs UK company, corporation tax Ireland vs UK, EEA resident director requirement, Section 137 bond, Section 486C start-up relief, company formation Ireland founders",
    jsonLd: [
      service(
        "Company Incorporation Advice",
        "Advice on incorporating in Ireland or the United Kingdom",
        "Comparison and advice on where to incorporate: corporation tax rates, start-up relief, director residency requirements, tax residence and ongoing filing obligations in Ireland and the UK.",
        "/ireland-vs-uk-company"
      ),
      faqPage(INCORPORATION_FAQ),
    ],
    changefreq: "monthly",
    priority: "0.8",
  },

  "/ireland-or-uk": {
    title: "Ireland or UK? Interactive Incorporation Decision Tool | FoundrBooks",
    description:
      "Answer five questions and get a reasoned view on whether to incorporate in Ireland or the UK — corporation tax, R&D credits, the EEA director requirement and tax residence. Free, runs in your browser.",
    ogTitle: "Ireland or the UK? Work out where to incorporate",
    ogDescription:
      "A five-question tool for founders deciding where to set up: profits, R&D spend, EEA directors, and the tax residence trap most people miss.",
    keywords:
      "incorporate Ireland or UK, where to incorporate startup, Irish company vs UK company, EEA resident director requirement, company incorporation decision tool, Ireland UK corporation tax comparison",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Ireland or UK? Incorporation decision tool",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        url: `${SITE}/ireland-or-uk`,
        description:
          "Interactive tool weighing corporation tax, R&D credits, the EEA-resident director requirement and tax residence to suggest whether a founder should incorporate in Ireland or the United Kingdom.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        provider: { "@type": "Organization", name: "FoundrBooks", url: SITE },
      },
    ],
    changefreq: "monthly",
    priority: "0.9",
  },

  "/frs-102-section-23": {
    title: "FRS 102 Section 23 Explained: New Revenue Rules from 2026 | FoundrBooks",
    description:
      "The 2026 FRS 102 Section 23 revenue changes in plain English: the five-step model, who it affects in Ireland and the UK, the switchover, and a one-minute check.",
    ogTitle: "FRS 102 Section 23 — the new revenue rules in plain English",
    ogDescription:
      "From 2026, Irish and UK companies count income when they deliver, not when they invoice. What changes, who's affected, and what the switchover involves.",
    keywords:
      "FRS 102 Section 23, FRS 102 revenue recognition 2026, FRS 102 amendments 2026, revenue from contracts with customers FRS 102, FRS 102 five-step model, FRS 102 transition modified retrospective, deferred income FRS 102, FRS 102 Section 1A revenue, FRS 105 revenue 2026, revenue recognition Ireland",
    jsonLd: [
      service(
        "FRS 102 Section 23 Transition",
        "Transition to the amended FRS 102 revenue recognition requirements",
        "Fixed-fee transition to amended FRS 102 Section 23 for Irish and UK companies: contract review, old-versus-new revenue figures, the retained earnings adjustment reconciled to the trial balance, the transition journal, and a draft of the required disclosure.",
        "/frs-102-section-23"
      ),
      faqPage(FRS102_FAQ),
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Are you affected by FRS 102 Section 23?",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        url: `${SITE}/frs-102-section-23#checker`,
        description:
          "A six-question check of whether the 2026 FRS 102 Section 23 revenue changes are likely to move a company's figures, and when its first affected year begins.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        provider: { "@type": "Organization", name: "FoundrBooks", url: SITE },
      },
    ],
    changefreq: "monthly",
    priority: "0.9",
  },

  "/success": {
    title: "Subscription confirmed | FoundrBooks",
    description: "Your FoundrBooks subscription is confirmed.",
    noindex: true,
  },

  "/404": {
    title: "Page not found | FoundrBooks",
    description: "That page doesn't exist. Head back to the FoundrBooks homepage.",
    noindex: true,
  },
};

// Routes that get prerendered to static HTML and (unless noindex) listed in the sitemap.
export const PRERENDER_ROUTES = Object.keys(ROUTES);

export function metaFor(pathname) {
  return ROUTES[pathname] || ROUTES["/404"];
}

/**
 * Build the full list of head tags for a route as plain descriptors.
 * Shared by the prerenderer (serialises to HTML) and the client Seo component
 * (applies to the live DOM) so the two can never drift apart.
 */
export function headTagsFor(pathname) {
  const m = metaFor(pathname);
  const url = `${SITE}${pathname === "/" ? "/" : pathname}`;

  const tags = [
    { name: "description", content: m.description },
    { name: "robots", content: m.noindex ? "noindex, follow" : "index, follow" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:title", content: m.ogTitle || m.title },
    { property: "og:description", content: m.ogDescription || m.description },
    { property: "og:image", content: OG_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:site_name", content: "FoundrBooks" },
    { property: "og:locale", content: "en_GB" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:url", content: url },
    { name: "twitter:title", content: m.ogTitle || m.title },
    { name: "twitter:description", content: m.ogDescription || m.description },
    { name: "author", content: "FoundrBooks" },
    { name: "geo.region", content: "GB IE" },
    { name: "geo.placename", content: "United Kingdom, Ireland" },
  ];

  if (m.keywords) tags.push({ name: "keywords", content: m.keywords });

  return { title: m.title, canonical: url, tags, jsonLd: m.jsonLd || [] };
}
