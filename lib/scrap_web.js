const rp = require('request-promise');
const $ = require('cheerio');
const asycn = require("async");

var appScrap = {
    getLinkDetik: function (url, res) {
        rp(url)
            .then(function (result) {
                let content = $('.m_content', result).html();
                let list = $("ul", content).html();
                var linkArr = []
                $('li', list).each(function (index) {
                    let isi = $(this).html()
                    let link = $('a', isi).attr("href")
                    let judul = $('h2', isi).text()
                    let image = $('img', isi).attr("src")
                    let tanggal = $('.date', isi).text()
                    let summary = $('.box_text', isi).text()
                    let result = {
                        link: link,
                        judul: judul,
                        image: image,
                        tanggal: tanggal,
                        summary: summary,
                    }
                    linkArr.push(result)
                })
                return res(linkArr);
            })
            .catch(function (err) {
                if (err) console.dir(err);
            })
    },
    getIsiDetik: function (url, res) {
        rp(url)
            .then(function (result) {
                let content = $('article', result).html();
                return res(content);
            })
            .catch(function (err) {
                if (err) console.dir(err);
            })
    },
    getLinkYoutube: function (url, res) {
        rp(url)
            .then(function (result) {
                let content = $('.expanded-shelf-content-list', result).html();
                var hasil = [];
                $('li', content).each(function (index) {
                    let judul = $('.yt-lockup-title', $(this).html()).text();
                    let url = $('.yt-lockup-title > a', $(this).html()).attr("href");
                    let imageAttr = $('img', $(this).html()).attr("data-thumb");
                    var image = ""
                    if (typeof imageAttr !== typeof undefined && imageAttr !== false) {
                        image = imageAttr;
                    } else {
                        image = $('img', $(this).html()).attr("src");
                    }
                    var detailView = [];
                    let viewUL = $('.yt-lockup-meta-info>li', $(this).html()).each(function (index) {
                        detailView.push($(this).text());
                    })
                    if (judul != "") {
                        let judulArr = judul.split("Durasi: ");
                        var durasi = "";
                        var judulfix = "";
                        if (judulArr.length > 1) {
                            durasi = judulArr[1].substr(0, judulArr[1].length - 1)
                            judulfix = judulArr[0]
                        }
                        var shortname = judulfix
                        if (judulfix.length > 50) {
                            shortname = judulfix.substr(0, 50) + ". . .";
                        }
                        hasil.push({
                            judul: judulfix,
                            shortname: shortname,
                            image: image,
                            durasi: durasi,
                            url: url,
                            detailView: detailView
                        });
                    }
                })
                return res(hasil);
            })
            .catch(function (err) {
                if (err) console.dir(err);
            })
    },
    getDetailYoutube: function (url, res) {
        rp(url)
            .then(function (result) {
                let watchHeader = $('#watch-header', result).html();
                let title = $('#eow-title', watchHeader).text();
                let view_countArr = $('.watch-view-count', watchHeader).text().split(" ");
                let view_count = $('.watch-view-count', watchHeader).text();
                let uploader = $('.yt-user-info>a', watchHeader).text();
                if (view_countArr.length > 1) {
                    view_count = view_countArr[0]
                }
                let imageAttr = $('img', watchHeader).attr("data-thumb");
                var image = ""
                if (typeof imageAttr !== typeof undefined && imageAttr !== false) {
                    image = imageAttr;
                } else {
                    image = $('img', watchHeader).attr("src");
                }
                let subscriber = $('.yt-subscriber-count', watchHeader).text();
                var hasil = {
                    judul: title.trim(),
                    view_count: view_count,
                    uploader: uploader,
                    uploader_image: image,
                    subscriber: subscriber
                }
                return res(hasil);
            })
            .catch(function (err) {
                if (err) console.dir(err);
            })
    },
    getSearchYoutube: function (url, res) {
        rp(url)
            .then(function (result) {
                let mainContent = $('#results', result).html();
                var hasil = []
                $('ol .item-section>li', mainContent).each(function (index) {
                    let judul = $('.yt-lockup-title', $(this).html()).text();
                    let url = $('.yt-lockup-title > a', $(this).html()).attr("href");
                    let imageAttr = $('img', $(this).html()).attr("data-thumb");
                    var image = ""
                    if (typeof imageAttr !== typeof undefined && imageAttr !== false) {
                        image = imageAttr;
                    } else {
                        image = $('img', $(this).html()).attr("src");
                    }
                    var detailView = [];
                    let viewUL = $('.yt-lockup-meta-info>li', $(this).html()).each(function (index) {
                        detailView.push($(this).text());
                    })
                    if (judul != "") {
                        let judulArr = judul.split("Durasi: ");
                        var durasi = "";
                        var judulfix = "";
                        if (judulArr.length > 1) {
                            durasi = judulArr[1].substr(0, judulArr[1].length - 1)
                            judulfix = judulArr[0]
                        }
                        var shortname = judulfix
                        if (judulfix.length > 50) {
                            shortname = judulfix.substr(0, 50) + ". . .";
                        }
                        hasil.push({
                            judul: judulfix,
                            shortname: shortname,
                            image: image,
                            durasi: durasi,
                            url: url,
                            detailView: detailView
                        });
                    }
                })
                return res(hasil);
            })
            .catch(function (err) {
                if (err) console.dir(err);
            })
    }
}

module.exports = appScrap;