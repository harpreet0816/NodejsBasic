const shortid = require('shortid');
const URL = require('../models/url')
async function handleGenerateNewShortUrl(req, res){
    console.log("req.body", req.body);
    const body = req.body;
    if(!body) return res.status(400).json({"error": "url not found"})
    const id = shortid.generate();
    const urls = await URL.create({
        shortId: id,
        redirectURL: body.url,
        visitHistory: []
    });
    const allUrls = await URL.find({})
    return res.render("home", {id: urls.shortId, urls: allUrls})
    // return res.status(200).json({"id": urls})
}
async function handleGetRedirectPage(req, res){
    const shortId = req.params.shortId;
    console.log(shortId, "shortId")
    const entry = await URL.findOneAndUpdate({shortId}, {$push:{
        visitHistory: { timestamp: Date.now()}
    }});
    res.redirect(entry.redirectURL)
}
async function handleGetAnalytics(req, res){
        const id = req.params.shortId;
        const result = await URL.findOne({ shortId: id });
        if(!result) return res.status(400).json({"error": "Unable to find User with such ShortId"});
        return res.status(200).json({"TotalClicks": result.visitHistory.length, "Analytics": result.visitHistory})
}

module.exports = {handleGenerateNewShortUrl, handleGetAnalytics, handleGetRedirectPage}