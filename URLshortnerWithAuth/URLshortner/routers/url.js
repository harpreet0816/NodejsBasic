const express = require('express');
const router = express.Router();
const {handleGenerateNewShortUrl, handleGetAnalytics, handleGetRedirectPage} = require("../controllers/url.js")
router.post("/", handleGenerateNewShortUrl);
router.get('/:shortId',handleGetRedirectPage)
router.get("/analytics/:shortId", handleGetAnalytics)
module.exports = router;