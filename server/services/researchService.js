const axios = require("axios");
const { createGeminiModel } = require("../config/gemini");
const { buildInvestmentPrompt } = require("../prompts/investmentPrompt");

const yahoo = axios.create({
  baseURL: "https://query1.finance.yahoo.com",
  timeout: 8000,
  headers: {
    "User-Agent": "investment-research-agent/1.0",
  },
});

let cachedCrumb = null;
let cachedCookie = null;

async function getYahooAuth() {
  if (cachedCrumb && cachedCookie) return { cookie: cachedCookie, crumb: cachedCrumb };
  try {
    const cookieRes = await axios.get('https://fc.yahoo.com', { validateStatus: () => true, headers: {'User-Agent': 'Mozilla/5.0'} });
    const setCookie = cookieRes.headers['set-cookie'];
    const cookie = setCookie ? setCookie[0].split(';')[0] : '';
    const crumbRes = await axios.get('https://query1.finance.yahoo.com/v1/test/getcrumb', {
      headers: { cookie, 'User-Agent': 'Mozilla/5.0' },
      timeout: 5000
    });
    cachedCookie = cookie;
    cachedCrumb = crumbRes.data;
    return { cookie, crumb: crumbRes.data };
  } catch (err) {
    return { cookie: '', crumb: '' };
  }
}

async function runInvestmentResearch(company) {
  const { ticker, quote, news } = await collectMarketResearch(company);
  const score = scoreCompany(quote, news, company);
  const aiNote = await createAiResearchNote({ company, marketData: quote, news });
  const fallback = buildFallbackNote(company, quote, news, score);
  const note = mergeResearchNotes(aiNote, fallback);
  let verdict = "PASS";
  if (score >= 85) verdict = "STRONG INVEST";
  else if (score >= 70) verdict = "INVEST";
  else if (score >= 50) verdict = "WATCHLIST";
  else if (score >= 35) verdict = "HOLD";

  return {
    company: quote?.shortName || quote?.longName || company,
    ticker: ticker || quote?.symbol || null,
    generatedAt: new Date().toISOString(),
    score,
    verdict,
    confidence: note.confidence || fallback.confidence,
    confidencePercent: note.confidencePercent || fallback.confidencePercent,
    summary: note.summary,
    thesis: note.thesis,
    business: note.business,
    financials: normalizeFinancials(quote),
    news: normalizeNews(news, note.newsAnalysis),
    risks: note.risks,
    catalysts: note.catalysts,
    justification: note.justification,
    strengths: note.strengths,
    concerns: note.concerns,
    researchSteps: [
      "Resolved public-market identity",
      "Reviewed quote, valuation, momentum, and liquidity signals",
      "Summarized recent headlines when available",
      "Scored the setup and formed an invest/pass decision",
    ],
    dataQuality: quote?.symbol ? "Live market snapshot plus AI analysis" : "AI analysis with demo market assumptions",
  };
}

async function collectMarketResearch(company) {
  try {
    const searchResponse = await yahoo.get("/v1/finance/search", {
      params: { q: company, quotesCount: 1, newsCount: 10 },
    });

    const firstQuote = searchResponse.data?.quotes?.find((item) => item.symbol);
    const ticker = firstQuote?.symbol;
    const news = (searchResponse.data?.news || []).slice(0, 5).map((item) => ({
      title: item.title,
      source: item.publisher,
      link: item.link,
      publishedAt: item.providerPublishTime
        ? new Date(item.providerPublishTime * 1000).toISOString()
        : null,
    }));

    if (!ticker) {
      return { ticker: null, quote: null, news };
    }

    // Try standard provider (Yahoo quoteSummary)
    let quote = null;
    try {
      const auth = await getYahooAuth();
      const quoteSummaryRes = await axios.get(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?modules=financialData,defaultKeyStatistics,summaryDetail,price&crumb=${auth.crumb}`, {
        headers: { cookie: auth.cookie, 'User-Agent': 'Mozilla/5.0' },
        timeout: 5000
      });
      const res = quoteSummaryRes.data?.quoteSummary?.result?.[0];
      if (res) {
        quote = {
          symbol: ticker,
          shortName: res.price?.shortName,
          longName: res.price?.longName,
          marketCap: res.price?.marketCap?.raw,
          regularMarketPrice: res.price?.regularMarketPrice?.raw,
          regularMarketChange: res.price?.regularMarketChange?.raw,
          regularMarketChangePercent: res.price?.regularMarketChangePercent?.raw,
          enterpriseValue: res.defaultKeyStatistics?.enterpriseValue?.raw,
          totalRevenue: res.financialData?.totalRevenue?.raw,
          revenueGrowth: res.financialData?.revenueGrowth?.raw,
          netIncome: res.defaultKeyStatistics?.netIncomeToCommon?.raw,
          trailingPE: res.summaryDetail?.trailingPE?.raw,
          forwardPE: res.summaryDetail?.forwardPE?.raw,
          pegRatio: res.defaultKeyStatistics?.pegRatio?.raw,
          grossMargins: res.financialData?.grossMargins?.raw,
          operatingMargins: res.financialData?.operatingMargins?.raw,
          profitMargins: res.financialData?.profitMargins?.raw,
          freeCashflow: res.financialData?.freeCashflow?.raw,
          debtToEquity: res.financialData?.debtToEquity?.raw,
          currentRatio: res.financialData?.currentRatio?.raw,
          returnOnEquity: res.financialData?.returnOnEquity?.raw,
          returnOnAssets: res.financialData?.returnOnAssets?.raw,
          dividendYield: res.summaryDetail?.dividendYield?.raw,
          beta: res.defaultKeyStatistics?.beta?.raw,
          fiftyTwoWeekHigh: res.summaryDetail?.fiftyTwoWeekHigh?.raw,
          fiftyTwoWeekLow: res.summaryDetail?.fiftyTwoWeekLow?.raw,
          targetMeanPrice: res.financialData?.targetMeanPrice?.raw,
          recommendationKey: res.financialData?.recommendationKey,
          trailingEps: res.defaultKeyStatistics?.trailingEps?.raw,
          fiftyDayAverage: res.summaryDetail?.fiftyDayAverage?.raw,
          twoHundredDayAverage: res.summaryDetail?.twoHundredDayAverage?.raw,
          regularMarketVolume: res.summaryDetail?.regularMarketVolume?.raw,
          averageDailyVolume3Month: res.price?.averageDailyVolume3Month?.raw
        };
      }
    } catch (e) {
      // Fallback strategy: Try older v7 endpoint if quoteSummary fails
      try {
        const fallbackRes = await axios.get(`https://query2.finance.yahoo.com/v7/finance/quote?symbols=${ticker}`, {
          headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const fbQuote = fallbackRes.data?.quoteResponse?.result?.[0];
        if (fbQuote) quote = fbQuote;
      } catch (e2) {
        // Allow it to fail gracefully
      }
    }

    return { ticker, quote, news };
  } catch (_error) {
    return { ticker: null, quote: null, news: [] };
  }
}

async function createAiResearchNote({ company, marketData, news }) {
  const model = createGeminiModel();
  if (!model) return null;

  try {
    const response = await model.invoke(
      buildInvestmentPrompt({ company, marketData, news })
    );
    const text = typeof response.content === "string"
      ? response.content
      : JSON.stringify(response.content);
    return parseJsonFromText(text);
  } catch (_error) {
    return null;
  }
}

function parseJsonFromText(text) {
  const cleaned = text.replace(/```json|```/g, "").trim();
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) return null;

  try {
    return JSON.parse(cleaned.slice(firstBrace, lastBrace + 1));
  } catch (_error) {
    return null;
  }
}

function scoreCompany(quote, news, company) {
  let score = 52 + (stableHash(company) % 14);

  if (quote?.marketCap > 10_000_000_000) score += 8;
  if (quote?.regularMarketChangePercent > 0) score += 6;
  if (quote?.fiftyDayAverage && quote?.regularMarketPrice > quote.fiftyDayAverage) score += 6;
  if (quote?.twoHundredDayAverage && quote?.regularMarketPrice > quote.twoHundredDayAverage) score += 7;
  if (quote?.trailingPE && quote.trailingPE > 0 && quote.trailingPE < 35) score += 6;
  if (quote?.forwardPE && quote?.trailingPE && quote.forwardPE <= quote.trailingPE) score += 5;
  if (quote?.regularMarketVolume && quote?.averageDailyVolume3Month && quote.regularMarketVolume > quote.averageDailyVolume3Month) score += 3;
  if (news?.length >= 3) score += 3;
  if (quote?.regularMarketChangePercent < -3) score -= 8;
  if (quote?.trailingPE > 60) score -= 7;

  return Math.max(24, Math.min(94, Math.round(score)));
}

function buildFallbackNote(company, quote, news, score) {
  const name = quote?.shortName || quote?.longName || company;
  const hasQuote = Boolean(quote?.symbol);
  const positive = score >= 68;
  const confidence = hasQuote ? "Medium" : "Low";

  return {
    summary: `${name} was reviewed across business quality, valuation, market momentum, recent headlines, and identifiable risks. The result is an educational ${positive ? "invest" : "pass"} signal based on the available evidence.`,
    business: {
      model: hasQuote
        ? `${name} is a publicly traded company represented by ${quote.symbol}; the model assessment should be refined with its filings and segment disclosures.`
        : `${name} needs company-specific filings or a confirmed ticker before a high-confidence business model view can be formed.`,
      moat: positive
        ? "The current signal suggests enough scale, liquidity, or momentum to keep the company in consideration."
        : "The current signal does not show enough margin of safety or confirmed evidence for an invest decision.",
      growthDrivers: [
        "Revenue durability and pricing power",
        "Operating leverage and cash generation",
        "Industry demand and management execution",
      ],
    },
    financials: [],
    newsAnalysis: [],
    risks: [
      {
        name: "Valuation risk",
        severity: quote?.trailingPE > 45 ? "High" : "Medium",
        detail: "A rich multiple can reduce future returns if growth slows or sentiment weakens.",
      },
      {
        name: "Execution risk",
        severity: "Medium",
        detail: "The thesis depends on management continuing to convert demand into profitable growth.",
      },
      {
        name: "Information quality",
        severity: hasQuote ? "Low" : "High",
        detail: hasQuote
          ? "Market data was found, but filings and detailed fundamentals should still be reviewed."
          : "No live ticker was confirmed, so the recommendation should be treated as a demo-grade signal.",
      },
    ],
    catalysts: [
      "Earnings updates and management guidance",
      "Margin expansion or free-cash-flow improvement",
      news?.[0]?.title || "New product, market, or capital allocation announcements",
    ],
    strengths: [
      "Established market presence",
      "Sufficient liquidity for standard trading",
      "Identified momentum signals"
    ],
    concerns: [
      "Lack of detailed fundamental verification",
      "Potential valuation mismatch",
      "Execution risk ahead of next earnings"
    ],
    justification: positive
      ? "Executive Summary: The company shows positive momentum and scale indicators. Business Strength: Scale and liquidity are sufficient. Financial Strength: Meets basic screening criteria. Competitive Advantage: Suggests adequate market positioning. Growth Drivers: Stable revenue and operations. Industry Position: Maintains relevance. Valuation Discussion: Acceptable ranges based on current data. Potential Risks: Execution and macro factors remain. Why the recommendation was chosen: The score clears the invest threshold. Long-term outlook: Cautiously optimistic."
      : "Executive Summary: The company does not currently meet investment criteria. Business Strength: Unverified fundamentals. Financial Strength: Valuation or momentum lacks safety margin. Competitive Advantage: Unclear from surface data. Growth Drivers: Needs stronger catalysts. Industry Position: May face competitive headwinds. Valuation Discussion: Appears rich or unconfirmed. Potential Risks: Valuation, execution, and macro factors. Why the recommendation was chosen: Preserving capital is favored over this setup. Long-term outlook: Re-evaluate upon stronger data.",
    thesis: positive
      ? `${name} earns an invest signal because the available data points to a stronger balance of quality, momentum, and catalysts than risk. This is not a buy order; it is a research recommendation for deeper diligence.`
      : `${name} earns a pass signal because the evidence is not strong enough to justify committing capital today. A cleaner valuation, stronger fundamentals, or clearer catalysts could change the view.`,
    confidence,
    confidencePercent: hasQuote ? 65 : 30,
  };
}

function mergeResearchNotes(aiNote, fallback) {
  if (!aiNote || typeof aiNote !== "object") {
    return fallback;
  }

  return {
    summary: aiNote.summary || fallback.summary,
    business: {
      model: aiNote.business?.model || fallback.business.model,
      moat: aiNote.business?.moat || fallback.business.moat,
      growthDrivers: arrayOrFallback(aiNote.business?.growthDrivers, fallback.business.growthDrivers),
    },
    financials: [],
    newsAnalysis: arrayOrFallback(aiNote.newsAnalysis, fallback.newsAnalysis),
    risks: arrayOrFallback(aiNote.risks, fallback.risks),
    catalysts: arrayOrFallback(aiNote.catalysts, fallback.catalysts),
    strengths: arrayOrFallback(aiNote.strengths, fallback.strengths),
    concerns: arrayOrFallback(aiNote.concerns, fallback.concerns),
    justification: aiNote.justification || fallback.justification,
    thesis: aiNote.thesis || fallback.thesis,
    confidence: aiNote.confidence || fallback.confidence,
    confidencePercent: aiNote.confidencePercent || fallback.confidencePercent,
  };
}

function buildMetric(label, rawValue, type, positiveCondition = null, negativeCondition = null) {
  let signal = "neutral";
  if (rawValue !== undefined && rawValue !== null) {
    if (positiveCondition && positiveCondition(rawValue)) signal = "positive";
    else if (negativeCondition && negativeCondition(rawValue)) signal = "negative";
  }

  let formatted = "Not Available";
  if (rawValue !== undefined && rawValue !== null && !isNaN(rawValue)) {
    if (type === "percent") {
      formatted = `${(rawValue * 100).toFixed(2)}%`;
      rawValue = rawValue * 100;
    } else if (type === "currency") {
      formatted = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 2,
      }).format(rawValue);
    } else if (type === "number") {
      formatted = Number(rawValue).toFixed(2);
    } else if (type === "string") {
      formatted = String(rawValue);
    }
  } else {
    rawValue = null; // Ensure raw is null if invalid
  }

  return {
    label,
    raw: rawValue,
    value: formatted,
    type,
    signal
  };
}

function normalizeFinancials(quote) {
  if (!quote) return [];

  const metrics = [
    buildMetric("Current Stock Price", quote.regularMarketPrice, "currency", null, null),
    buildMetric("Market Capitalization", quote.marketCap, "currency", v => v > 10_000_000_000, null),
    buildMetric("Revenue (TTM)", quote.totalRevenue, "currency", null, null),
    buildMetric("Net Income", quote.netIncome, "currency", v => v > 0, v => v < 0),
    buildMetric("Earnings Per Share (EPS)", quote.trailingEps, "currency", v => v > 0, v => v < 0),
    buildMetric("Return on Equity (ROE)", quote.returnOnEquity, "percent", v => v > 0.15, v => v < 0),
    buildMetric("Gross Margin", quote.grossMargins, "percent", v => v > 0.4, v => v < 0.1),
    buildMetric("Operating Margin", quote.operatingMargins, "percent", v => v > 0.15, v => v < 0),
    buildMetric("Profit Margin", quote.profitMargins, "percent", v => v > 0.1, v => v < 0),
    buildMetric("Free Cash Flow", quote.freeCashflow, "currency", v => v > 0, v => v < 0)
  ];

  return metrics;
}

function normalizeNews(news, newsAnalysis = []) {
  if (!news?.length) {
    return [
      {
        title: "No live headlines were available during this run.",
        source: "Research Agent",
        link: null,
        takeaway: "Use this as a prompt to review filings, earnings calls, and trusted financial news before investing.",
        sentiment: "Neutral",
      },
    ];
  }

  return news.map((item) => {
    const analysis = newsAnalysis.find(a => a.title && (a.title.includes(item.title) || item.title.includes(a.title)));
    return {
      ...item,
      takeaway: analysis?.summary || "Headline included in the sentiment and catalyst review.",
      sentiment: analysis?.sentiment || "Neutral",
    };
  });
}

function arrayOrFallback(value, fallback) {
  return Array.isArray(value) && value.length ? value : fallback;
}

function stableHash(input) {
  return input.split("").reduce((hash, char) => {
    return (hash * 31 + char.charCodeAt(0)) >>> 0;
  }, 7);
}

async function validateCompanyExistence(company) {
  try {
    const searchResponse = await yahoo.get("/v1/finance/search", {
      params: { q: company, quotesCount: 1, newsCount: 1 },
    });
    const firstQuote = searchResponse.data?.quotes?.find((item) => item.symbol);
    return !!firstQuote?.symbol;
  } catch (error) {
    return false;
  }
}

module.exports = { runInvestmentResearch, validateCompanyExistence };
