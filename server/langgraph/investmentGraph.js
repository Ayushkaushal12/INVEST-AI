const { runInvestmentResearch } = require("../services/researchService");

async function invokeInvestmentGraph(company) {
  return runInvestmentResearch(company);
}

module.exports = { invokeInvestmentGraph };
