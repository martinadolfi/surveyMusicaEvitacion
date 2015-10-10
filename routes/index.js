var express = require('express');
var router = express.Router();
var fs = require('fs');
var idFile='id.txt';
var surveyFile='survey.txt';
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
var userReference=[];
var currentID=0;
var howManyAudios=10;

currentID=fs.readFileSync(idFile);
console.log("currentId=" + currentID);

/* GET home page. */
router.get('/old', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
    var audioList=[];
    fs.readdir("public/audio/",function(err,files){
        if (!err){
            for (var f in files){
                audioList.push("audio/"+files[f]);
            }
        }
        var thisU={id:currentID,audioList:shuffle(audioList)};
        userReference.push(thisU);
        res.render('main',{id:parseInt(currentID),audioList:thisU.audioList.slice(0,howManyAudios-1)});
        currentID++;
        fs.writeFile(idFile,currentID,function(err){
           if (err) throw err;
            console.log("id++");
        });
    });

});

router.get('/newAudio',function(req,res,next){
    var myId=req.query.userId;
    var audioIndex=parseInt(req.query.audioIndex);
    var u={};
    for (var i in userReference){
        if (userReference[i].id==myId){
            res.end(userReference[i].audioList[audioIndex]);
            break;
        }
    }
});

router.post('/saveSurvey',function(req,res){
    var data = JSON.parse(req.body.surveyData)  ;
    fs.appendFile(surveyFile,req.body.surveyData + "\n",function(err){
        if (err) throw err;
        console.log("saved survey ID " + data[0].id);
        res.end();
    });

});


module.exports = router;
