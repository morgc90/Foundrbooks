// api/chat.js — AI assistant proxy
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: "Invalid request" });

  const systemPrompt = `You are the FoundrBooks AI accounting assistant. FoundrBooks is an ACA-qualified accounting firm based in Ireland and Spain, specialising in online founders, freelancers, self-employed individuals, SaaS businesses, and Shopify stores. Pricing is in EUR: Starter €99/mo, Growth €249/mo, Scale €449/mo.

Answer UK and Irish tax and accounting questions clearly, concisely, and practically. Be helpful, warm, and jargon-free. Always suggest booking a free call with FoundrBooks for personalised advice on complex matters. Keep responses under 160 words. Contact: cashinify@gmail.com | +34 658 208 448 | foundrbooks.com`;

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
