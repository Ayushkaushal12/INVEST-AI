const express = require("express");
const { researchCompany, validateCompany } = require("../controllers/researchController");

const router = express.Router();

router.get("/validate", validateCompany);
router.post("/", researchCompany);

module.exports = router;
