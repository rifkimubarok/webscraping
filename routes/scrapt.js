var express = require('express');
var router = express.Router();
var scrapt = require('../lib/scrap_web')
var db = require("../lib/database")
var escapeHtml = require("htmlspecialchars")

router.get("/generate", function (req, res, next) {
    var beritaSaved = 0
    scrapt.getLinkDetik("https://inet.detik.com/games", async function (result) {
        await result.forEach(data => {
            if ((data.link != '') && (data.judul != '')) {
                db.check_berita(data.link, function (isExist) {
                    if (!isExist) {
                        scrapt.getIsiDetik(data.link, function (content) {
                            data.isi = escapeHtml(content)
                            data.source = "detik"
                            db.save_berita(data, function (resul) {
                                if (resul == true) {
                                    console.dir("Simpan Berhasil")
                                    beritaSaved += 1;
                                    console.log(beritaSaved)
                                } else console.dir("simpan gagal")
                            })
                        });
                    } else {
                        console.dir("berita sudah ada")
                    }
                })
            }
        });
        res.send({
            status: true,
            beritaSaved: beritaSaved
        }).status(200)
    })
})

module.exports = router