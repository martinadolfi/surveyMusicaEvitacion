var express = require('express');
var router = express.Router();
var fs = require ('fs');
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
var audioList=[];
fs.readdir("public/audio/",function(err,files){
  if (!err){
    for (var f in files){
      audioList.push("audio/"+files[f]);
    }
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/main', function(req, res, next) {
  res.render('main',{id:0,audioList:shuffle(audioList)});
});




module.exports = router;
