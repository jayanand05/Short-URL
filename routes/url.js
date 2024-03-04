const express = require("express");
const {
  handleGenerateNewShortURL,
  handleAnalyticsClicks,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleAnalyticsClicks);

module.exports = router;
