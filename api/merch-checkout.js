// api/merch-checkout.js — one-off Stripe Checkout for the merch shop.
//
// Prices live HERE, not in the browser: the client only sends item ids, sizes
// and quantities, and every amount Stripe charges comes from this table.
// Keep it in step with src/merch.js (which only controls what's displayed).

const CATALOG = {
  "tee-black": { name: "Basic tee — Black", cents: 2800, sized: true },
  "tee-white": { name: "Basic tee — White", cents: 2800, sized: true },
  "tee-camo": { name: "Basic tee — Woodland Camo", cents: 3500, sized: true },
  "stk-pack": { name: "Sticker pack (6)", cents: 1200, sized: false },
};

const SIZES = ["S", "M", "L", "XL", "XXL"];
const SHIPPING_CENTS = 500; // flat rate — keep in sync with src/merch.js

// UK, Ireland and the EU-27.
const SHIP_TO = [
  "GB", "IE", "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
];

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  if (!items.length || items.length > 20) return res.status(400).json({ error: "Your bag is empty." });

  const params = new URLSearchParams();
  let i = 0;
  for (const it of items) {
    const p = CATALOG[it?.id];
    const qty = Math.floor(Number(it?.qty));
    if (!p || !(qty >= 1 && qty <= 20)) return res.status(400).json({ error: "Invalid item in bag." });
    if (p.sized && !SIZES.includes(it.size)) return res.status(400).json({ error: "Pick a size for every tee." });
    const label = p.sized ? `${p.name} — ${it.size}` : p.name;
    params.append(`line_items[${i}][quantity]`, String(qty));
    params.append(`line_items[${i}][price_data][currency]`, "eur");
    params.append(`line_items[${i}][price_data][unit_amount]`, String(p.cents));
    params.append(`line_items[${i}][price_data][product_data][name]`, label);
    params.append(`line_items[${i}][price_data][product_data][metadata][sku]`, it.id);
    if (p.sized) params.append(`line_items[${i}][price_data][product_data][metadata][size]`, it.size);
    i++;
  }

  const site = process.env.NEXT_PUBLIC_URL || "https://foundrbooks.com";
  params.append("mode", "payment");
  params.append("success_url", `${site}/success?order=merch`);
  params.append("cancel_url", `${site}/shop`);
  params.append("locale", "en");
  params.append("allow_promotion_codes", "true");
  params.append("phone_number_collection[enabled]", "false");
  params.append("metadata[source]", "merch");
  SHIP_TO.forEach((c, n) => params.append(`shipping_address_collection[allowed_countries][${n}]`, c));
  params.append("shipping_options[0][shipping_rate_data][type]", "fixed_amount");
  params.append("shipping_options[0][shipping_rate_data][display_name]", "Standard (UK, Ireland & EU)");
  params.append("shipping_options[0][shipping_rate_data][fixed_amount][amount]", String(SHIPPING_CENTS));
  params.append("shipping_options[0][shipping_rate_data][fixed_amount][currency]", "eur");

  try {
    const r = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });
    const session = await r.json();
    if (!r.ok) {
      console.error("Stripe error:", session);
      return res.status(500).json({ error: "Checkout is unavailable right now. Please try again." });
    }
    return res.status(200).json({ url: session.url });
  } catch (e) {
    console.error("Server error:", e);
    return res.status(500).json({ error: "Checkout is unavailable right now. Please try again." });
  }
}
