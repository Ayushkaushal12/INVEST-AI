const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

function createGeminiModel() {
  const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new ChatGoogleGenerativeAI({
    apiKey,
    model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
    temperature: 0.25,
  });
}

module.exports = { createGeminiModel };
