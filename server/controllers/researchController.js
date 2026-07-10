const { runInvestmentResearch, validateCompanyExistence } = require("../services/researchService");

async function researchCompany(req, res, next) {
  try {
    const company = String(req.body?.company || "").trim();

    if (!company) {
      return res.status(400).json({ message: "Company name is required." });
    }

    if (company.length > 80) {
      return res.status(400).json({ message: "Company name is too long." });
    }

    const result = await runInvestmentResearch(company);
    return res.json(result);
  } catch (error) {
    return next(error);
  }
}

async function validateCompany(req, res, next) {
  try {
    const company = String(req.query?.company || "").trim();
    if (!company) {
      return res.status(400).json({ isValid: false });
    }
    const isValid = await validateCompanyExistence(company);
    return res.json({ isValid });
  } catch (error) {
    return next(error);
  }
}

module.exports = { researchCompany, validateCompany };
