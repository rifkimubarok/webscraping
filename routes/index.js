var express = require('express');
var router = express.Router();
var scrap = require('../lib/scrap_web')

/* GET home page. */
router.get('/', function (req, res, next) {
  scrap.getLinkYoutube("https://www.youtube.com/feed/trending", function (result) {
    res.render('index', {
      title: "Trending Video :: Home",
      data: result
    });
  })
});

router.get('/watch', function (req, res, next) {
  scrap.getDetailYoutube("https://www.youtube.com/watch?v=" + req.query.v, function (result) {
    res.render('detail', {
      title: result.judul + " :: Home",
      data: result,
      video: req.query.v
    });
  })
})

router.get('/search', function (req, res, next) {
  scrap.getSearchYoutube("https://www.youtube.com/results?search_query=" + req.query.keyword, function (result) {
    res.render('index', {
      title: "Hasil pencarian " + req.query.keyword,
      data: result
    });
    res.send(result)
  })
})

module.exports = router;