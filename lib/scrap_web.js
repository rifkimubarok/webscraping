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
    }
}

module.exports = appScrap;