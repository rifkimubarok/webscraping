const mysql = require("mysql");
const async = require("async")

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "webscraping"
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

var crud = {
    save_berita: function (data, result) {
        let query = "insert into berita (link,judul,gambar,tanggal,summary,isi,source) value (?,?,?,?,?,?,?)"
        var param = []
        Object.keys(data).forEach(function (key) {
            param.push(data[key])
        })
        var hasil = false
        async.parallel([
            function (parallel_done) {
                db.query(query, param, function (err, data) {
                    if (err) {
                        hasil = false
                    }
                    hasil = true
                    parallel_done()
                })
            }
        ], function (err) {
            if (err) console.log(err);
            return result(hasil);
        })
    },
    check_berita: function (link, result) {
        let query = "select link as jumlah from berita where link  = ?"
        var hasil = false;
        async.parallel([
            function (parallel_done) {
                db.query(query, [link], function (err, data) {
                    if (err) hasil = false
                    if (parseInt(data.length) > 0) {
                        hasil = true
                    } else hasil = false
                    parallel_done()
                })
            }
        ], function (err) {
            if (err) console.log(err);
            return result(hasil);
        })
    }
}

module.exports = crud