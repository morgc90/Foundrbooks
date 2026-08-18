// Single source of truth for per-route SEO metadata.
// Consumed by:
//   - src/components/Seo.jsx      (client-side / SPA navigation)
//   - scripts/prerender.mjs       (build-time HTML injection)
//
// Tax figures verified against revenue.ie and gov.uk in August 2026.
// Re-check these after each Budget / Finance Act before publishing changes.

export const SITE = "https://foundrbooks.com";
export const OG_IMAGE = `${SITE}/og-image.png`;

const ORGANISATION = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "FoundrBooks",
  description:
    "AI-powered accounting for UK and Irish founders and startups. ACA qualified accountant specialising in limited companies, SaaS businesses, and early-stage companies.",
  url: SITE,
  telephone: "+34658208448",
  email: "cashinify@gmail.com",
  areaServed: ["GB", "IE"],
  priceRange: "€€",
  currenciesAccepted: "EUR",
  hasCredential: "ACA Qualified Accountant",
  knowsAbout: [
    "UK Corporation Tax",
    "Irish Corporation Tax",
    "Self Assessment",
    "VAT Registration UK",
    "VAT Registration Ireland",
    "Startup Accounting",
    "SaaS Finance",
    "SaaS Revenue Recognition",
    "Limited Company Accounting",
    "R&D Tax Credits",
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
    a: "Ireland charges 12.5% corporation tax on trading income, one of the lowest rates in Europe. Ireland's R&D tax credit is also available at 35% of qualifying expenditure following Budget 2026, and it is refundable in cash over three annual instalments even for loss-making companies.",
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

export const ROUTES = {
  "/": {
    title: "FoundrBooks — Accounting for UK & Irish Founders and Startups | ACA Qualified",
    description:
      "FoundrBooks is an AI-powered accounting service for UK and Irish founders and startups. ACA qualified accountant, instant AI tax assistant, transparent pricing. Specialists in limited companies, SaaS, and early-stage businesses.",
    ogTitle: "FoundrBooks — Accounting for UK & Irish Founders and Startups",
    ogDescription:
      "ACA-qualified accounting with a live AI tax assistant. Built for UK and Irish founders, startups, and limited companies. Transparent monthly pricing, no surprises.",
    keywords:
      "accounting for startups UK, accountant for founders UK, accountant for startups Ireland, limited company accountant UK, startup accountant Ireland, ACA qualified accountant, AI accounting UK Ireland, corporation tax UK startup, VAT registration Ireland, SaaS accountant UK, R&D tax credits UK Ireland",
    jsonLd: [ORGANISATION, faqPage(HOME_FAQ)],
    changefreq: "weekly",
    priority: "1.0",
  },

  "/saas-accounting": {
    title: "SaaS Accounting for Irish & UK Software Companies | FoundrBooks",
    description:
      "Specialist accountants for SaaS founders in Ireland and the UK. Revenue recognition, deferred revenue, ARR reporting, R&D tax credits and VAT OSS — from €99/month.",
    ogTitle: "SaaS Accounting for Irish & UK Software Companies",
    ogDescription:
      "ACA-qualified accountants for subscription software businesses. IFRS 15 revenue recognition, deferred revenue schedules, ARR reporting, R&D credits and cross-border VAT.",
    keywords:
      "SaaS accountant Ireland, SaaS accounting UK, accountants for software companies, SaaS revenue recognition Ireland, deferred revenue SaaS, R&D tax credits SaaS, ARR reporting accountant, IFRS 15 SaaS",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "SaaS Accounting",
        serviceType: "Accounting and financial reporting for subscription software businesses",
        description:
          "Specialist accounting for SaaS companies in Ireland and the UK: IFRS 15 revenue recognition, deferred revenue schedules, payment processor reconciliation, ARR and MRR reporting, R&D tax credit claims and cross-border VAT.",
        url: `${SITE}/saas-accounting`,
        areaServed: ["IE", "GB"],
        provider: ORGANISATION,
      },
      faqPage(SAAS_FAQ),
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
    { name: "twitter:image", content: OG_IMAGE },
    { name: "author", content: "FoundrBooks" },
    { name: "geo.region", content: "GB IE" },
    { name: "geo.placename", content: "United Kingdom, Ireland" },
  ];

  if (m.keywords) tags.push({ name: "keywords", content: m.keywords });

  return { title: m.title, canonical: url, tags, jsonLd: m.jsonLd || [] };
}
