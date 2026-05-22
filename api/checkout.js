export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { priceId, planName } = req.body;

  if (!priceId) {
    return res.status(400).json({ error: "Missing priceId" });
  }

  const validPrices = [
    "price_1TZaZBG4d0qXhaypu2eBPcNg",
    "price_1TZaa8G4d0qXhaypiJccAh0R",
    "price_1TZaaoG4d0qXhaypQuwu4ENv",
  ];

  if (!validPrices.includes(priceId)) {
    return res.status(400).json({ error: "Invalid price" });
  }

  try {
    const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "mode": "subscription",
        "line_items[0][price]": priceId,
        "line_items[0][quantity]": "1",
        "success_url": `${process.env.NEXT_PUBLIC_URL || "https://foundrbooks.com"}/success?plan=${planName}`,
        "cancel_url": `${process.env.NEXT_PUBLIC_URL || "https://foundrbooks.com"}/#pricing`,
        "billing_address_collection": "auto",
        "allow_promotion_codes": "true",
        "subscription_data[metadata][plan]": planName,
        "locale": "en",
      }),
    });

    const session = await stripeRes.json();

    if (!stripeRes.ok) {
      console.error("Stripe error:", session);
      return res.status(500).json({ error: session.error?.message || "Stripe error" });
    }

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
