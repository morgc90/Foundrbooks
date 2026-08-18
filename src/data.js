// Shared content data used by both the client app and the prerender step.

export const CONTACT = {
  email: "cashinify@gmail.com",
  phone: "+34 658 208 448",
  phoneHref: "tel:+34658208448",
  callSubject: "Free 30-min call with FoundrBooks",
};

export const mailto = (subject = CONTACT.callSubject) =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;

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
  { icon: "🛒", name: "Shopify bookkeeping", desc: "Inventory, multi-currency, and payment gateway reconciliation." },
  { icon: "🧾", name: "VAT & compliance", desc: "VAT registration, filing, and cross-border EU compliance." },
  { icon: "👤", name: "Self-employed", desc: "Self assessment, expenses, and tax planning for freelancers." },
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
  { label: "Paying myself?", q: "How do I pay myself from my limited company?" },
];
