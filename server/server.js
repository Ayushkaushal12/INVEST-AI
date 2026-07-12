require("dotenv").config();

const express = require("express");
const cors = require("cors");
const researchRoutes = require("./routes/researchRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "investment-research-agent" });
});

app.use("/api/research", researchRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong while researching the company.",
  });
});

app.listen(PORT, () => {
  console.log(`Investment research server running on port ${PORT}`);
});
