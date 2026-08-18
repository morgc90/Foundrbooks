// Shared content data used by both the client app and the prerender step.

export const CONTACT = {
  email: "cashinify@gmail.com",
  // The number is never displayed on the site — it only lives inside the
  // wa.me deep link so visitors start a WhatsApp chat instead of dialling.
  whatsapp: "https://wa.me/34658208448",
  whatsappText: "Hi FoundrBooks — I'd like to ask about accounting for my company.",
  callSubject: "Free 30-min call with FoundrBooks",
};

export const whatsappLink = (text = CONTACT.whatsappText) =>
  `${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

export const mailto = (subject = CONTACT.callSubject) =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;

// Independent verification of the practice's credentials.
export const CREDENTIAL = {
  name: "Morgan Cashin",
  body: "Chartered Accountants Ireland",
  directoryUrl:
    "https://www.charteredaccountants.ie/Find-a-Firm/Firms-Directory?type=members&country=98&city=dublin&memberName=morgan%20cashin",
};

export const PLANS = [
  {
    name: "Starter",
    desc: "Sole traders & freelancers",
    price: "€99",
    priceId: "price_1TZaZBG4d0qXhaypu2eBPcNg",
    features: ["Self assessment return", "Expense tracking", "AI assistant access", "Quarterly check-ins"],
    featured: false,
  },
  {
    name: "Growth",
    desc: "Limited companies & SaaS",
    price: "€249",
    priceId: "price_1TZaa8G4d0qXhaypiJccAh0R",
    features: ["Full bookkeeping", "Corporation tax", "VAT filing", "Payroll up to 3", "Unlimited AI assistant", "Monthly calls"],
    featured: true,
  },
  {
    name: "Scale",
    desc: "High-growth & e-commerce",
    price: "€449",
    priceId: "price_1TZaaoG4d0qXhaypQuwu4ENv",
    features: ["Everything in Growth", "Investor reporting", "Multi-currency", "Unlimited payroll", "Weekly calls"],
    featured: false,
  },
];

export const SERVICES = [
  { icon: "🚀", name: "Startup accounting", desc: "Bookkeeping from incorporation through to Series A and beyond." },
  { icon: "🔁", name: "SaaS finance", desc: "MRR tracking, IFRS 15 compliance, and investor-ready metrics.", to: "/saas-accounting" },
  { icon: "🔬", name: "R&D tax credits", desc: "35% in Ireland, merged RDEC in the UK — claims we can defend.", to: "/rd-tax-credits" },
  { icon: "🧾", name: "VAT & cross-border", desc: "Registration, OSS, and digital services VAT across the UK and EU.", to: "/vat-digital-services" },
  { icon: "🏛️", name: "Ireland or UK?", desc: "Where to incorporate, and what each choice costs you in tax.", to: "/ireland-vs-uk-company" },
  { icon: "✨", name: "AI tax assistant", desc: "24/7 instant answers backed by a qualified accountant." },
];

export const REVIEWS = [
  { name: "Sarah Chen", role: "Founder, TechFlow SaaS", text: "FoundrBooks helped us navigate complex revenue recognition and investor reporting. Their SaaS expertise is unmatched.", initial: "S" },
  { name: "David Murphy", role: "CEO, GreenStore", text: "As a Shopify store owner, having an accountant who truly understands e-commerce has been game-changing for our business.", initial: "D" },
  { name: "James O'Brien", role: "Freelance Designer", text: "I used to dread tax season. Now it's completely stress-free. My self assessment is filed on time every year without me lifting a finger.", initial: "J" },
  { name: "Aoife Kelly", role: "Co-founder, LaunchPad", text: "From incorporation to our first funding round, FoundrBooks has been with us every step. Genuinely feel like they're part of the team.", initial: "A" },
  { name: "Marco Rossi", role: "Director, Rossi Consulting", text: "The AI assistant alone is worth it — I get instant answers to tax questions at 11pm without waiting for a call back.", initial: "M" },
  { name: "Emma Walsh", role: "Owner, The Candle Co.", text: "Switched from a big accountancy firm and the difference is night and day. Personal, fast, and they actually explain things clearly.", initial: "E" },
];

export const QUICK_PROMPTS = [
  { label: "Sole trader vs Ltd?", q: "Am I better off as a sole trader or limited company?" },
  { label: "What can I claim?", q: "What expenses can I claim as self-employed?" },
  { label: "VAT threshold?", q: "When do I need to register for VAT?" },
  { label: "Ireland or UK?", q: "Should I incorporate my company in Ireland or the UK?" },
];

// Cross-links shown at the foot of each guide page.
export const GUIDES = [
  { to: "/saas-accounting", name: "SaaS accounting", desc: "Revenue recognition, deferred revenue and ARR reporting." },
  { to: "/rd-tax-credits", name: "R&D tax credits", desc: "What qualifies, what it's worth, and how to claim." },
  { to: "/vat-digital-services", name: "VAT on digital services", desc: "OSS, reverse charge and cross-border thresholds." },
  { to: "/ireland-vs-uk-company", name: "Ireland or UK?", desc: "Where to incorporate and what it costs in tax." },
];
