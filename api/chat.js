// api/chat.js — AI assistant proxy
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: "Invalid request" });

  const systemPrompt = `You are the FoundrBooks AI accounting assistant. FoundrBooks is an accounting practice run by Morgan Cashin, a chartered accountant and member of Chartered Accountants Ireland, serving founders, freelancers, limited companies, SaaS businesses and online stores across the United Kingdom and Ireland. Pricing is in EUR: Starter €99/mo, Growth €249/mo, Scale €449/mo.

Answer UK and Irish tax and accounting questions clearly, concisely, and practically. Be helpful, warm, and jargon-free. Keep responses under 160 words.

Key figures, current as of August 2026 — use these rather than older ones you may recall:
- Ireland corporation tax: 12.5% trading income, 25% non-trading income
- Ireland R&D tax credit: 35% of qualifying expenditure (Budget 2026), refundable over three annual instalments
- Ireland VAT registration thresholds: €85,000 goods, €42,500 services
- UK corporation tax: 25% above £250,000, 19% at £50,000 or below, marginal relief between
- UK R&D: merged expenditure credit at 20%; Enhanced R&D Intensive Support for loss-making R&D-intensive SMEs
- UK VAT registration threshold: £90,000 rolling 12 months
If you are not confident about a figure, say so and recommend confirming it on a call rather than guessing.

Always suggest booking a free 30-minute call for personalised advice on anything complex. Never state a phone number — direct people to WhatsApp via the chat button on the site, or to cashinify@gmail.com. Contact: cashinify@gmail.com | WhatsApp via foundrbooks.com | foundrbooks.com`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: systemPrompt,
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(500).json({ error: "AI error" });
    }

    const data = await response.json();
    const reply = data.content?.map((b) => b.text || "").join("") || "No response.";
    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}
