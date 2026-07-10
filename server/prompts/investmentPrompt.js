function buildInvestmentPrompt({ company, marketData, news }) {
  return `
You are an investment research analyst. Produce a balanced educational research note for "${company}".

Use the supplied market data and news when available. If a field is missing, state a careful assumption instead of inventing exact facts.

Return only valid JSON with this shape:
{
  "summary": "2 sentence overview",
  "business": {
    "model": "A highly detailed 300-400 word report dynamically explaining: what the company does, core products, core services, revenue model, business segments, primary customers, global presence, market position, competitive advantages, economic moat, innovation strategy, expansion strategy, recent developments, future opportunities, and long-term outlook. This must be entirely unique per company and NEVER reuse boilerplate or hardcoded text. Use paragraphs and bullet points for readability where appropriate.",
    "moat": "competitive advantage or weakness",
    "growthDrivers": ["driver 1", "driver 2", "driver 3"]
  },
  "financials": [
    { "label": "Revenue / scale", "value": "concise value", "signal": "positive|neutral|negative" }
  ],
  "risks": [
    { 
      "name": "A highly specific, company-tailored risk title (e.g., 'EV Competition', 'Hardware Demand', 'Password Sharing'). DO NOT use generic categories like 'Market Risks'. Generate exactly 8-10 highly specific risks.", 
      "severity": "Low|Medium|High", 
      "detail": "2-4 sentence explanation including potential investor impact and possible mitigation or positive counterpoint" 
    }
  ],
  "newsAnalysis": [
    {
      "title": "Exact headline from provided news",
      "summary": "Brief 1-2 sentence summary focused on investor impact",
      "sentiment": "Positive|Neutral|Negative"
    }
  ],
  "catalysts": ["catalyst 1", "catalyst 2", "catalyst 3"],
  "strengths": ["Top strength 1", "Top strength 2", "Top strength 3"],
  "concerns": ["Top concern 1", "Top concern 2", "Top concern 3"],
  "justification": "A 250-350 word detailed explanation including: Executive Summary, Business Strength, Financial Strength, Competitive Advantage, Growth Drivers, Industry Position, Valuation Discussion, Potential Risks, Why the recommendation was chosen, and Long-term outlook. MUST BE ENTIRELY UNIQUE per company.",
  "thesis": "one paragraph investment thesis",
  "confidencePercent": 85
}

Market data:
${JSON.stringify(marketData || {}, null, 2)}

Recent news:
${JSON.stringify(news || [], null, 2)}
`;
}

module.exports = { buildInvestmentPrompt };
