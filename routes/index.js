var express = require('express');
var router = express.Router();

var shuffle = function (array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

var audioList=[
  "audio/001.mp3",
  "audio/002.mp3",
  "audio/003.mp3",
  "audio/004.mp3",
  "audio/005.mp3",
  "audio/006.mp3",
  "audio/007.mp3",
  "audio/008.mp3",
  "audio/009.mp3",
  "audio/010.mp3",
  "audio/011.mp3",
  "audio/012.mp3",
  "audio/013.mp3",
  "audio/014.mp3",
  "audio/015.mp3",
  "audio/016.mp3",
  "audio/017.mp3"
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/main', function(req, res, next) {
  res.render('main',{id:0,audioList:shuffle(audioList)});
});




module.exports = router;
