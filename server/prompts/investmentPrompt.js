function buildInvestmentPrompt({ company, marketData, news }) {
  return `
You are an investment research analyst. Produce a balanced educational research note for "${company}".

Use the supplied market data and news when available. If a field is missing, state a careful assumption instead of inventing exact facts.

Return only valid JSON with this shape:
{
  "summary": "2 sentence overview",
  "score": "Integer between 0 and 100 representing the company's Investment Score, calculated dynamically based on Financial Health, Business Model Strength, Profitability, Revenue Growth, Moat, Valuation, News Sentiment, and Risks. High quality companies (e.g. Apple, Microsoft, NVIDIA) MUST naturally get high scores (80-100), while poor companies should get lower scores. If marketData is sparse but the company is a known mega-cap/blue-chip, use your internal knowledge to evaluate its fundamentals and assign a strong score accordingly.",
  "verdict": "One of: STRONG INVEST, INVEST, HOLD, WATCHLIST, PASS, STRONG PASS based heavily on the calculated score.",
  "business": {
    "model": "A 180-250 word report dynamically explaining the business. MUST include these sections: Company Overview, Core Products & Services, Revenue Sources, Primary Customers, Industry Position, Competitive Advantage (Economic Moat), Growth Strategy, and Future Outlook. Highlight important keywords in bold. Use short paragraphs. Improve readability. Do not repeat information. This must be entirely unique per company and NEVER reuse boilerplate or hardcoded text.",
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
  "justification": "A 250-350 word detailed explanation including: Executive Summary, Business Strength, Financial Strength, Competitive Advantage, Growth Drivers, Industry Position, Valuation Discussion, Potential Risks, Why the recommendation was chosen, and Long-term outlook. MUST BE ENTIRELY UNIQUE per company. If marketData is missing but the company is well-known, synthesize your own accurate knowledge of their financial health. Only if the company is completely obscure with no data should you state there is insufficient information.",
  "thesis": "one paragraph investment thesis",
  "confidencePercent": "Integer between 0 and 100 representing AI certainty dynamically calculated based on: Financial stability, Availability of financial data, Business quality, News sentiment, Market volatility, Risk assessment, and AI certainty. Will be very low for unknown companies."
}

Market data:
${JSON.stringify(marketData || {}, null, 2)}

Recent news:
${JSON.stringify(news || [], null, 2)}
`;
}

module.exports = { buildInvestmentPrompt };
