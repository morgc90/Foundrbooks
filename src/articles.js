// Long-form articles and service pages rendered by src/pages/Article.jsx.
// Each entry becomes a prerendered route (see src/seo.js) with its own title,
// meta description, Article/Service JSON-LD and FAQPage JSON-LD.
//
// Figures verified against revenue.ie, cro.ie and gov.uk in November 2026.
// Re-check after each Budget / Finance Act.

export const ARTICLES = [
  // ---------------------------------------------------------------------------
  {
    path: "/shopify-accountant",
    kind: "service",
    serviceType: "Accounting and bookkeeping for Shopify and e-commerce businesses",
    title: "Shopify Accountant for Irish & UK E-commerce Stores | FoundrBooks",
    description:
      "Chartered accountants for Shopify stores in Ireland and the UK. A2X and Xero bookkeeping, payout reconciliation, OSS and IOSS VAT, stock and margin reporting.",
    guideName: "Shopify accountant",
    guideDesc: "A2X, payouts, OSS/IOSS VAT and real margins for online stores.",
    badge: "A2X certified · Xero certified",
    h1: "Accounting for Shopify stores that actually reconciles.",
    sub: "Your Shopify dashboard says one number, your bank says another, and your accounts say a third. We make them agree — and then tell you what your margins really are.",
    ctaSubject: "Shopify accounting — free 30-min call",
    sections: [
      {
        label: "The problem",
        h2: "Why e-commerce books go wrong.",
        paras: [
          "A Shopify payout is not a sale. Each payout bundles dozens of orders, net of processing fees, refunds, chargebacks, discounts and sometimes currency conversion, and it lands in your bank days after the orders were placed. Post the payout as revenue and your sales, fees and VAT are all wrong at once.",
          "Add a second channel — Amazon, Etsy, TikTok Shop, wholesale — and the gap between what you sold and what you banked becomes impossible to explain from bank feeds alone.",
        ],
      },
      {
        label: "What we do",
        h2: "What's included.",
        bullets: [
          "A2X set up and mapped properly, so each payout posts to Xero as a summarised journal: gross sales, discounts, refunds, fees, shipping income and VAT, all separated",
          "Payout-to-bank reconciliation for Shopify Payments, PayPal, Stripe, Klarna and marketplaces",
          "Cost of goods sold and stock valuation at month end, not just at year end",
          "VAT returns in Ireland or the UK, plus EU One Stop Shop (OSS) and Import One Stop Shop (IOSS) returns where you need them",
          "Monthly gross margin by channel, so you know which ones actually make money after fees and returns",
          "Year-end accounts, corporation tax, payroll and director remuneration planning",
        ],
      },
      {
        label: "VAT",
        h2: "Cross-border VAT for online sellers.",
        paras: [
          "Selling to consumers in other EU countries: once your cross-border B2C sales of goods and digital services together exceed €10,000 a year, VAT is due at the customer's local rate. The One Stop Shop lets you report all of it on one quarterly return instead of registering in every country.",
          "Shipping goods into the EU from outside it — including from Great Britain — in consignments worth €150 or less: the Import One Stop Shop (IOSS) lets you charge VAT at checkout, so your customer isn't hit with VAT and a handling fee on delivery. The UK runs its own regime for consignments of £135 or less going into Great Britain.",
          "Irish VAT registration thresholds are €85,000 for goods and €42,500 for services. The UK threshold is £90,000 of taxable turnover in any rolling twelve months.",
        ],
        callout:
          "Northern Ireland is different. For goods, it stays inside the EU VAT system — so a GB seller shipping to NI, or an Irish seller shipping to GB, needs to get the rules right before the first order, not after the first customs letter.",
      },
      {
        label: "Pricing",
        h2: "What it costs.",
        paras: [
          "Most Shopify and e-commerce businesses sit on our Scale plan at €449 a month, which covers multi-channel bookkeeping, VAT and OSS returns, management reporting and year-end. Smaller single-channel stores can start on Growth at €249 a month. A2X subscriptions are discounted through our partner account.",
        ],
      },
    ],
    faq: [
      {
        q: "Do I need A2X if I use Shopify and Xero?",
        a: "Almost always, once you have more than a handful of orders a day. Shopify's own Xero integration posts individual orders or raw payouts, neither of which reconciles cleanly. A2X summarises each payout into one accurate journal that matches the deposit in your bank.",
      },
      {
        q: "Can you fix books that are already a mess?",
        a: "Yes. A catch-up usually means rebuilding the sales and fee history from Shopify and A2X reports, reconciling every payout, and correcting VAT. We quote a fixed fee for it once we have seen the data.",
      },
      {
        q: "When do I need to register for the One Stop Shop?",
        a: "If you are established in Ireland or another EU country, once your cross-border sales to EU consumers of goods and digital services together pass €10,000 in a calendar year. Below that you can charge your home VAT rate.",
      },
      {
        q: "Do you work with Amazon, Etsy and TikTok Shop sellers?",
        a: "Yes. A2X supports the major marketplaces, and multi-channel sellers are exactly who it was built for. We report margin by channel so you can see where fees and returns are eating your profit.",
      },
    ],
    related: ["/vat-digital-services", "/ireland-vs-uk-company", "/tax-planning-for-startups-tips-for-year-end"],
  },

  // ---------------------------------------------------------------------------
  {
    path: "/key-metrics-every-saas-founder-should-track",
    kind: "article",
    title: "Key SaaS Metrics Every Founder Should Track (and How to Calculate Them) | FoundrBooks",
    description:
      "MRR, ARR, churn, net revenue retention, CAC payback, gross margin and burn multiple — what each SaaS metric means, how to calculate it and what good looks like.",
    guideName: "Key SaaS metrics",
    guideDesc: "MRR, churn, NRR, CAC payback and burn multiple, explained.",
    badge: "SaaS finance",
    h1: "The SaaS metrics that actually matter.",
    sub: "Investors ask for the same dozen numbers. Here's what each one means, how to calculate it from your own data, and which ones to fix first.",
    ctaSubject: "SaaS metrics — free 30-min call",
    sections: [
      {
        label: "Revenue",
        h2: "MRR and ARR.",
        paras: [
          "Monthly recurring revenue (MRR) is the normalised monthly value of your active subscriptions. An annual plan at €1,200 is €100 of MRR, not €1,200 in the month it's paid. Exclude one-off fees, setup charges and usage overages unless they reliably recur.",
          "Annual recurring revenue (ARR) is MRR × 12. It is a run-rate, not revenue in your accounts — recognised revenue follows delivery of the service under IFRS 15 or FRS 102 Section 23, so the two will rarely match. Both are legitimate; presenting one as the other is not.",
        ],
        callout:
          "Break MRR movement into new, expansion, contraction and churned MRR every month. A flat total can hide strong growth being cancelled out by churn — and that's a completely different business problem.",
      },
      {
        label: "Retention",
        h2: "Churn and net revenue retention.",
        paras: [
          "Logo churn is the share of customers who cancel in a period. Revenue churn is the share of starting MRR you lose to cancellations and downgrades. Track both: losing many small customers and losing one large one feel very different in the numbers.",
          "Net revenue retention (NRR) = (starting MRR + expansion − contraction − churn) ÷ starting MRR, usually measured over twelve months for a cohort. Above 100% means your existing customers grow faster than they leave — the single strongest signal of product-market fit in B2B SaaS.",
        ],
      },
      {
        label: "Efficiency",
        h2: "CAC, payback and LTV.",
        bullets: [
          "Customer acquisition cost (CAC): total sales and marketing spend in a period, including salaries and tools, divided by new customers won in that period",
          "CAC payback (months): CAC ÷ (new MRR per customer × gross margin %). Under twelve months is healthy for SMB SaaS; enterprise can justify longer",
          "Lifetime value (LTV): average MRR per customer × gross margin % ÷ monthly revenue churn rate. Treat it with caution when you have little churn history — it is easy to flatter",
          "LTV:CAC of around 3:1 is the common benchmark; much higher can mean you are under-investing in growth",
        ],
      },
      {
        label: "Margins and cash",
        h2: "Gross margin and burn multiple.",
        paras: [
          "SaaS gross margin should include hosting, third-party software that scales with usage, payment processing and customer support — not just servers. Mature SaaS businesses typically run at 70–80%+. If yours is far below that, find out which cost line is responsible before you raise.",
          "Burn multiple = net cash burned ÷ net new ARR in the same period. It answers the question investors care most about in a tighter market: how much cash does it take to add a euro of recurring revenue? Below 1.5 is efficient; above 2–3 invites hard questions.",
        ],
      },
      {
        label: "Getting it right",
        h2: "Why your metrics need clean books.",
        paras: [
          "Every metric above depends on correctly categorised costs and properly deferred revenue. If sales salaries sit in admin, CAC looks brilliant. If annual plans are booked as revenue on receipt, growth looks lumpy and gross margin swings month to month. Fix the ledger first and the dashboard follows.",
        ],
      },
    ],
    faq: [
      {
        q: "Should annual prepayments count as MRR in the month they're paid?",
        a: "No. Divide the contract value by the number of months it covers. The cash is a balance-sheet item (deferred revenue) until the service is delivered.",
      },
      {
        q: "What's a good net revenue retention rate?",
        a: "Above 100% is good, above 110–120% is strong for B2B SaaS. SMB-focused products often sit lower because small customers churn more; the trend matters as much as the level.",
      },
      {
        q: "How often should we calculate these?",
        a: "MRR movements and burn monthly, as part of the month-end close. CAC, payback and NRR are more meaningful on a rolling quarterly or annual basis, because single months are noisy.",
      },
    ],
    related: ["/saas-accounting", "/understanding-ifrs-15-for-saas-companies", "/rd-tax-credits"],
  },

  // ---------------------------------------------------------------------------
  {
    path: "/understanding-ifrs-15-for-saas-companies",
    kind: "article",
    title: "IFRS 15 for SaaS Companies: Revenue Recognition Explained | FoundrBooks",
    description:
      "How IFRS 15 and the new FRS 102 Section 23 apply to SaaS: the five-step model, annual prepayments, setup fees, usage pricing, multi-year deals and common mistakes.",
    guideName: "IFRS 15 for SaaS",
    guideDesc: "The five-step model applied to subscriptions, setup fees and usage.",
    badge: "Revenue recognition",
    h1: "IFRS 15 for SaaS, in plain English.",
    sub: "Cash in the bank and revenue in your accounts are different things. Here's how the revenue standard applies to subscription software — and where SaaS companies usually get it wrong.",
    ctaSubject: "IFRS 15 / revenue recognition — free 30-min call",
    sections: [
      {
        label: "Why it matters",
        h2: "Revenue follows delivery, not invoices.",
        paras: [
          "IFRS 15 sets one principle: recognise revenue as you transfer what you promised to the customer, in the amount you expect to be entitled to. For a subscription, that means spreading the price over the period of service rather than booking it when the invoice goes out or the cash arrives.",
          "It's no longer just a question for large companies. From accounting periods beginning on or after 1 January 2026, FRS 102 Section 23 — the framework most Irish and UK private companies use — was rewritten around the same five-step model.",
        ],
      },
      {
        label: "The model",
        h2: "The five steps, applied to SaaS.",
        bullets: [
          "1. Identify the contract — your order form, online terms or master agreement with the customer",
          "2. Identify the performance obligations — usually access to the platform, plus anything distinct such as implementation, training or premium support",
          "3. Determine the transaction price — including discounts, credits, and an estimate of variable usage fees where appropriate",
          "4. Allocate the price to each obligation based on its standalone selling price",
          "5. Recognise revenue as each obligation is satisfied — for platform access, evenly over the subscription term",
        ],
      },
      {
        label: "Common situations",
        h2: "How the tricky bits work.",
        paras: [
          "Annual prepayment: a customer pays €12,000 up front for a year. You recognise €1,000 a month; the unearned balance sits on the balance sheet as deferred revenue and unwinds each month.",
          "Setup and onboarding fees: if the setup work doesn't give the customer anything useful on its own, it usually isn't a separate obligation. The fee is spread over the expected customer relationship rather than recognised on day one — a frequent source of overstated revenue in early-stage companies.",
          "Usage-based pricing: revenue is recognised as the usage occurs. Where usage fees are variable within a contract, include only the amount that is highly probable not to reverse.",
          "Multi-year deals with discounts: the discount is generally spread across the whole contract, not taken entirely in year one or year three.",
        ],
        callout:
          "Contract costs matter too. Sales commissions paid to win a contract can often be capitalised and expensed over the life of the customer relationship, rather than hitting the P&L in the month they're paid.",
      },
      {
        label: "Mistakes",
        h2: "What we see go wrong.",
        bullets: [
          "Treating invoices raised as revenue, so annual billing creates huge spikes in the P&L",
          "Recognising setup fees immediately",
          "Presenting ARR or bookings as revenue in investor reports and statutory accounts",
          "No deferred revenue schedule at all — which surfaces painfully in investor due diligence",
          "Ignoring the FRS 102 Section 23 transition adjustment for the first affected year",
        ],
      },
    ],
    faq: [
      {
        q: "Does IFRS 15 apply to my small SaaS company?",
        a: "If you report under full IFRS, yes. Most Irish and UK private companies report under FRS 102, whose revenue section was replaced with an IFRS 15-style five-step model for periods beginning on or after 1 January 2026. In practice, the same principles now apply.",
      },
      {
        q: "Is deferred revenue a bad thing?",
        a: "No. It's a liability on paper, but it represents cash already collected for service you will deliver. Investors generally like seeing a healthy deferred revenue balance because it means customers are paying up front.",
      },
      {
        q: "Will this change our tax bill?",
        a: "It can change which year profit falls into, and the one-off transition adjustment can have tax consequences. The total profit over the life of a contract doesn't change.",
      },
    ],
    related: ["/frs-102-section-23", "/saas-accounting", "/key-metrics-every-saas-founder-should-track"],
  },

  // ---------------------------------------------------------------------------
  {
    path: "/tax-planning-for-startups-tips-for-year-end",
    kind: "article",
    title: "Year-End Tax Planning for Startups: Ireland & UK Checklist | FoundrBooks",
    description:
      "Year-end tax planning for Irish and UK startup companies: pension contributions, capital allowances, R&D claims, director pay, bonuses and the deadlines that follow.",
    guideName: "Year-end tax planning",
    guideDesc: "What to do before your company year end, in Ireland and the UK.",
    badge: "Ireland & UK",
    h1: "Year-end tax planning for startups.",
    sub: "Most tax planning only works before your year end, not after it. A short checklist for founders of Irish and UK limited companies.",
    ctaSubject: "Year-end tax planning — free 30-min call",
    sections: [
      {
        label: "Start here",
        h2: "Know your numbers first.",
        paras: [
          "Planning starts with a reasonable estimate of the year's profit, two or three months before the year end. That needs up-to-date bookkeeping: reconciled bank accounts, invoices raised, and costs posted. Without it, every decision below is a guess.",
        ],
      },
      {
        label: "Checklist",
        h2: "Before the year end.",
        bullets: [
          "Pension contributions: employer contributions to a director's pension are generally deductible for corporation tax in the period they're paid, in both Ireland and the UK, and are not taxed on the director at that point. They must actually be paid before the year end, not just accrued",
          "Equipment purchases: in the UK, the Annual Investment Allowance gives a 100% deduction on qualifying plant and machinery up to £1 million a year. In Ireland, most equipment qualifies for capital allowances at 12.5% a year over eight years, so timing a purchase just before the year end brings the first year's allowance forward",
          "Bonuses: a bonus accrued at the year end is generally deductible in that year if it is paid within the required window after the year end (six months in Ireland, nine months in the UK)",
          "Director salary: use your personal tax-free allowances and lower bands efficiently through salary before reaching for dividends",
          "R&D: if your team resolved genuine technical uncertainty this year, start documenting it now — Ireland's credit is 35% of qualifying spend and refundable in cash",
          "Bad debts and stock: write off debts you won't collect and obsolete stock before the year end, with evidence",
        ],
      },
      {
        label: "Ireland",
        h2: "Irish-specific points.",
        paras: [
          "Small companies pay preliminary corporation tax by the 23rd day of the month before the year end — the 11th month of a 12-month period. It can be based on 100% of the previous year's liability or 90% of the current year's. A new company with a liability of €200,000 or less doesn't pay preliminary tax in its first year.",
          "New start-up companies may qualify for Section 486C relief, which can reduce corporation tax to nil where the liability is €40,000 or less in each of the first five years, capped by the employer PRSI paid.",
          "The CT1 return and the balance of tax are due by the 23rd of the ninth month after the year end.",
        ],
      },
      {
        label: "United Kingdom",
        h2: "UK-specific points.",
        paras: [
          "Corporation tax is 19% on profits up to £50,000 and 25% above £250,000, with marginal relief in between — so the effective marginal rate in that band is 26.5%. Deductions such as pension contributions are worth most when profit falls in the marginal band.",
          "For most small companies, corporation tax is due nine months and one day after the year end, and the CT600 return twelve months after it. Accounts go to Companies House within nine months.",
        ],
      },
      {
        label: "Caution",
        h2: "Don't spend a euro to save 12.5 cents.",
        paras: [
          "A deduction at 12.5% only saves 12.5% of what you spend. Buy equipment because the business needs it, not to cut the tax bill. The best year-end planning is usually about timing and structure — when income and costs fall, and how you take money out — not about creating expenses.",
        ],
      },
    ],
    faq: [
      {
        q: "When should we start year-end planning?",
        a: "Two to three months before the year end, once the management accounts are reliable enough to estimate profit. Most useful actions have to be completed before the year end date.",
      },
      {
        q: "Is a company pension contribution better than a dividend?",
        a: "Often, for founders who don't need the cash now. The company gets a deduction, and there's no immediate income tax or social insurance for the director. Dividends get no company deduction and are taxed in the director's hands. The right mix depends on your income and plans.",
      },
      {
        q: "Can we still plan after the year end?",
        a: "A little: claiming reliefs you're entitled to, choosing how to treat certain items, and paying accrued bonuses within the time limit. But most planning needs to happen before the year closes.",
      },
    ],
    related: ["/ct1-deadline-ireland", "/rd-tax-credits", "/ireland-vs-uk-company"],
  },

  // ---------------------------------------------------------------------------
  {
    path: "/ct1-deadline-ireland",
    kind: "article",
    title: "CT1 Deadline 2026: When Irish Companies Must File & Pay | FoundrBooks",
    description:
      "When is the CT1 due? The 23rd of the ninth month after your year end via ROS. Deadlines by year end, preliminary tax dates, surcharges, and what to prepare.",
    guideName: "CT1 deadline",
    guideDesc: "Irish corporation tax filing and payment dates by year end.",
    badge: "Irish corporation tax",
    h1: "When is the CT1 due?",
    sub: "The short answer: the 23rd day of the ninth month after your company's year end, if you file and pay through ROS. Here's how that works for your year end, and what comes before it.",
    ctaSubject: "CT1 / corporation tax — free 30-min call",
    sections: [
      {
        label: "The rule",
        h2: "Nine months, then the 23rd.",
        paras: [
          "Every Irish-resident company must file a corporation tax return — Form CT1, together with Form 46G — and pay the balance of its corporation tax within nine months of the end of its accounting period. For returns filed and paid through the Revenue Online Service (ROS), which is almost all of them, the deadline is the 23rd of that ninth month.",
        ],
        table: {
          head: ["Year end", "CT1 and balance of tax due"],
          rows: [
            ["31 December 2025", "23 September 2026"],
            ["31 March 2026", "23 December 2026"],
            ["30 June 2026", "23 March 2027"],
            ["30 September 2026", "23 June 2027"],
            ["31 December 2026", "23 September 2027"],
          ],
        },
      },
      {
        label: "Before the CT1",
        h2: "Preliminary tax comes first.",
        paras: [
          "Preliminary tax is paid during the accounting period, long before the return. A small company — one whose corporation tax for the previous period was €200,000 or less — pays it by the 23rd of the 11th month, one month before the year end. It can base the payment on 100% of the previous period's liability or 90% of the current period's.",
          "Large companies pay in two instalments, in the 6th and 11th months. A new small company doesn't pay preliminary tax in its first accounting period, but must file and pay the full amount by the normal CT1 date.",
        ],
        callout:
          "The commonest mistake we see: founders diarise the CT1 date and forget preliminary tax was due ten months earlier. Underpaying preliminary tax means interest, even if the CT1 is on time.",
      },
      {
        label: "Late filing",
        h2: "What happens if you're late.",
        bullets: [
          "A surcharge is added to the tax: 5% (up to €12,695) if the return is filed within two months of the deadline, 10% (up to €63,485) after that",
          "Interest runs on late tax at a daily rate",
          "Late filing can restrict certain reliefs and claims, including losses and some capital allowances",
          "Separately, the CRO annual return (Form B1) has its own deadline — miss it and you face CRO late fees and, for repeated late filing, loss of audit exemption",
        ],
      },
      {
        label: "Preparation",
        h2: "What you need to file.",
        paras: [
          "To prepare the CT1 we need your finalised year-end accounts, the corporation tax computation (adjusting accounting profit for items such as depreciation, entertainment and capital allowances), details of directors' remuneration, any losses brought forward, and claims such as R&D credits or start-up relief. Most companies also need to submit financial statements in iXBRL format.",
          "Accounts take time, so start the year-end process two to three months after your year end. The 23rd of the ninth month comes round faster than it sounds.",
        ],
      },
    ],
    faq: [
      {
        q: "Is the CT1 deadline the 21st or the 23rd?",
        a: "The 23rd for companies that file the return and pay the tax through ROS, which is almost everyone. The 21st applies only where the ROS conditions aren't met.",
      },
      {
        q: "Do I need to file a CT1 if my company made a loss?",
        a: "Yes. A CT1 is required for every accounting period, whether or not tax is payable, and filing on time protects your right to use the losses.",
      },
      {
        q: "Is the CT1 the same as the CRO annual return?",
        a: "No. The CT1 goes to Revenue and covers corporation tax. The annual return (Form B1) goes to the Companies Registration Office with your financial statements and has a different deadline, based on your annual return date.",
      },
    ],
    related: ["/tax-planning-for-startups-tips-for-year-end", "/do-i-need-an-accountant-limited-company-ireland", "/ireland-vs-uk-company"],
  },

  // ---------------------------------------------------------------------------
  {
    path: "/do-i-need-an-accountant-limited-company-ireland",
    kind: "article",
    title: "Do I Need an Accountant for a Limited Company in Ireland? | FoundrBooks",
    description:
      "What an Irish limited company must file each year, whether you legally need an accountant or auditor, audit exemption thresholds, and what doing it yourself involves.",
    guideName: "Do I need an accountant?",
    guideDesc: "What an Irish limited company must file, and who can do it.",
    badge: "Irish companies",
    h1: "Do I need an accountant for a limited company in Ireland?",
    sub: "Legally, no — there's no rule that says a company must hire an accountant. Practically, most do. Here's what your company has to file each year, and what's involved if you do it yourself.",
    ctaSubject: "Limited company accounting — free 30-min call",
    sections: [
      {
        label: "The obligations",
        h2: "What every Irish company files.",
        bullets: [
          "Annual return (Form B1) to the Companies Registration Office, with financial statements attached, within 56 days of the annual return date",
          "Financial statements prepared under the Companies Act 2014 and an accounting framework such as FRS 102 or FRS 105",
          "Corporation tax return (Form CT1 and Form 46G) to Revenue by the 23rd of the ninth month after the year end, plus preliminary tax during the year",
          "VAT returns, if registered — usually every two months",
          "Payroll submissions to Revenue each time you pay a salary, including to yourself as a director",
          "Register of Beneficial Owners kept up to date",
          "Directors' own Form 11 income tax returns, as most directors are chargeable persons",
        ],
      },
      {
        label: "Audit",
        h2: "Do I need an auditor?",
        paras: [
          "Most small companies don't. A company qualifies as small if it meets two of three tests: balance sheet total of €7.5 million or less, turnover of €15 million or less, and 50 or fewer employees. Small companies can generally claim audit exemption.",
          "Audit exemption can be lost. The CRO rules changed in July 2025: a company that files its annual return late more than once in a five-year period loses audit exemption for the following two years. An audit for a small company typically costs a few thousand euro a year, which makes late filing far more expensive than the CRO late fee.",
        ],
      },
      {
        label: "DIY",
        h2: "Can I do it myself?",
        paras: [
          "You can. Plenty of founders keep their own books in Xero or similar software. The hard parts are the year-end: preparing financial statements that comply with company law and accounting standards, the corporation tax computation, iXBRL tagging, and getting director pay, expenses and benefits-in-kind right.",
          "The risk isn't usually the filing itself — it's what you don't know to claim or avoid. Start-up relief under Section 486C, R&D credits, pension contributions, the treatment of a director's loan account, and VAT on cross-border sales are where a qualified accountant tends to pay for themselves.",
        ],
        callout:
          "Check credentials. 'Accountant' isn't a protected title in Ireland. Look for membership of a recognised body such as Chartered Accountants Ireland, ACCA or CPA Ireland — you can verify it in the body's public directory.",
      },
      {
        label: "What it costs",
        h2: "What an accountant costs.",
        paras: [
          "Fees vary with transaction volume and complexity. FoundrBooks charges a flat monthly fee: Growth at €249 a month covers bookkeeping, VAT, payroll for directors, year-end accounts, the CRO annual return and the CT1 for most limited companies, with a chartered accountant reviewing everything that's filed.",
        ],
      },
    ],
    faq: [
      {
        q: "Is it a legal requirement to have an accountant for an Irish company?",
        a: "No. The legal requirements are to keep proper books, prepare compliant financial statements and file returns on time. An accountant is not mandatory, though an audit is required for companies that don't qualify for exemption.",
      },
      {
        q: "What happens if I file the CRO annual return late?",
        a: "The CRO charges a late filing fee of €100 plus €3 a day, up to €1,200 per return. Filing late more than once within five years also costs the company its audit exemption for the next two years.",
      },
      {
        q: "Can my accountant be my company secretary?",
        a: "Yes, an accountant or a firm can act as company secretary, and many founders choose that. The secretary's legal duties remain, so make sure the arrangement is in writing.",
      },
    ],
    related: ["/ct1-deadline-ireland", "/ireland-vs-uk-company", "/tax-planning-for-startups-tips-for-year-end"],
  },
];

export const ARTICLE_PATHS = ARTICLES.map((a) => a.path);
export const articleFor = (path) => ARTICLES.find((a) => a.path === path);
