# FoundrBooks — update 2: three new guide pages, WhatsApp, UK & Ireland only

Upload these files to the repo the same way as last time (GitHub → Add file →
Upload files → drag the *contents* of this folder in). No new npm packages this
round. Built and verified with `CI=true npm run build`.

---

## What's new

### Three new indexable pages

| Route | Words | Targets |
|---|---|---|
| `/rd-tax-credits` | 1,214 | R&D tax credits Ireland/UK, merged RDEC, ERIS, software claims |
| `/vat-digital-services` | 1,426 | VAT OSS, reverse charge, €10,000 threshold, place of supply |
| `/ireland-vs-uk-company` | 1,388 | incorporation comparison, Section 486C, EEA director rule |

Your site now has **five indexable pages totalling roughly 6,500 words** of real
HTML, up from one page with zero. Each has its own title, description,
canonical, `Service` schema and `FAQPage` schema, and each is prerendered.

They cross-link to each other and to `/saas-accounting` through a "Related
guides" block, and all four appear in the site-wide footer. Internal linking
matters — an orphaned page ranks poorly however good it is.

### WhatsApp instead of the phone number

- A floating **Chat on WhatsApp** button on every page (full pill on desktop, circular on mobile).
- WhatsApp buttons in each page header and call-to-action block.
- **The number is no longer displayed anywhere on the site.** It only exists inside the `wa.me` link, so visitors start a chat instead of seeing a number to dial.
- Removed from the footer, from the `noscript` fallback, from the JSON-LD `telephone` field, and from the AI assistant's system prompt.

One caveat worth knowing: a `wa.me` link necessarily contains the number in the
URL, so anyone who inspects the link can read it. That's inherent to WhatsApp —
there's no version of this that hides it completely. It's just no longer
*presented* anywhere.

### UK & Ireland only

Every reference to Spain is gone: the hero trust row, the footer strip, the
`noscript` text, and the AI assistant's system prompt (which had been telling
people the practice was "based in Ireland and Spain" and giving out the number).

### Your Chartered Accountants Ireland listing

Added as a verification link in the hero and the footer — *"Morgan Cashin —
verify with Chartered Accountants Ireland ↗"* — and as `sameAs`, `memberOf` and
`founder` in the organisation schema, which is exactly what those fields are for.
Naming a real, independently verifiable person is the single biggest trust signal
an accounting site can carry.

One thing to check: the directory URL you sent is a search-results link with
query parameters. Those can break if the site changes its search. If Chartered
Accountants Ireland gives you a stable profile URL, send it over and I'll swap it
in — the link lives in one place, `CREDENTIAL.directoryUrl` in `src/data.js`.

### The AI assistant now knows the current figures

`api/chat.js` previously had no tax figures in its system prompt, so it answered
from the model's training data — which is how you end up with a bot quoting the
old 25% R&D credit on your own website. It now carries the verified August 2026
numbers and is instructed to say when it isn't confident rather than guess.

---

## Figures used, and where they came from

All verified from primary sources on 18 August 2026:

| Figure | Source |
|---|---|
| Ireland CT 12.5% trading / 25% non-trading | revenue.ie |
| Ireland R&D credit 35%, refundable over 3 instalments, threshold €87,500 | revenue.ie, citizensinformation.ie (Budget 2026) |
| Ireland VAT thresholds €85,000 goods / €42,500 services | revenue.ie |
| Section 486C: nil CT at ≤€40,000, marginal to €60,000, 5-year period, PRSI cap €5,000 per person / €40,000 overall | revenue.ie Tax and Duty Manual 15-03-03 |
| EEA director requirement, €25,000 bond, Section 140 certificate | cro.ie Information Leaflet 17 |
| UK CT 25% / 19% with marginal relief between £50,000 and £250,000 | gov.uk |
| UK merged RDEC 20%; ERIS 86% deduction, 14.5% payable credit, 30% intensity | gov.uk |
| UK VAT threshold £90,000 rolling 12 months | gov.uk |
| EU B2C €10,000 threshold, OSS, non-Union OSS, location evidence | revenue.ie, gov.uk |

Each page carries a dated disclaimer noting the figures were correct as of
August 2026 and that the page is general information rather than advice. Worth
diarising a review after each Budget.

---

## After deploying

1. **Resubmit the sitemap** — it now lists five URLs instead of two.
2. **Request indexing** for each new page in Search Console.
3. **Test the AI chat and WhatsApp button** on the live site.

---

## Still outstanding

- **`cashinify@gmail.com`.** Now the only contact address shown on the site, which makes it more prominent than before, not less. `hello@foundrbooks.com` would carry considerably more weight on a chartered practice's site.
- **Google Business Profile.** Still the highest-ROI thing not yet done, if you have a business address to verify.
- **No privacy policy or terms**, and no registered company details in the footer.
- **An About page.** You're now named on the site, which is a real improvement — a page with your background, when you qualified, and who you work with would build on it.
