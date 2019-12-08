var express = require('express');
var router = express.Router();
var gen = require("../lib/generate")
var scrap = require('../lib/scrap_web')


router.get("/generate", async function (req, res, next) {
    gen.generateDetik(function (jml) {
        res.send({
            status: true,
            beritaSaved: jml
        }).status(200)
    })
})


router.get("/youtube", async function (req, res, next) {
    scrap.getLinkYoutube("https://www.youtube.com/feed/trending", function (result) {
        res.send(result).status(200);
    })
})


router.get("/ytdetail", async function (req, res, next) {
    scrap.getDetailYoutube("https://www.youtube.com/watch?v=AibPkYw30Nc", function (result) {
        res.send(result).status(200);
    })
})

module.exports = router