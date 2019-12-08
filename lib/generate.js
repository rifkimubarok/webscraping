var scrapt = require('../lib/scrap_web')
var db = require("../lib/database")
var escapeHtml = require("htmlspecialchars")

var gen = {
    generateDetik: function (jml) {
        var beritaSaved = 0
        scrapt.getLinkDetik("https://inet.detik.com/", async function (result) {
            const wait = await result.forEach(data => {
                if ((data.link != '') && (data.judul != '')) {
                    db.check_berita(data.link, function (isExist) {
                        if (!isExist) {
                            scrapt.getIsiDetik(data.link, async function (content) {
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
            return jml(beritaSaved)
        })
    }
}

module.exports = gen