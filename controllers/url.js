const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ msg: "url is required" });
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  res.render("home", {
    id: shortID,
  });
  //   return res.json({ id: shortID });
}

async function handleAnalyticsClicks(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  res.json({
    totalClicks: result.visitHistory.length,
    analytic: result.visitHistory,
  });
}

module.exports = { handleGenerateNewShortURL, handleAnalyticsClicks };
