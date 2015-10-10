/**
 * Created by MartinG on 9/27/2015.
 */

var myID = recievedID;
var audio=[];
for (var a in recievedAudioList){
    audio.push(new Audio(recievedAudioList[a]));
}
var i=0;
var resultados=[];
var tiempoDeEncuesta=20000;
var threshold=5;
var colores=["yellow","red","blue","black","green","pink","violet","orange"];
var iColores=0;
var start,end={};
var cron=0;
var audioDelay={};
var getNewAudio = function() {
    $.get("/newAudio?userId=" + myID + "&audioIndex=" + audio.length, function (data) {
        console.log(data);
        audio.push(new Audio(data));
    });
};
var finDeAudio = function(){
    end = new Date().getTime();
    audio[i-1].pause();
    cron = end - start;
    resultados.push({id:myID,audio:audio[i-1].src,cron:cron});
};
var playAudio = function(){
    audio[i].onended = function(){
        finDeAudio();
        audioDelay = setTimeout(playAudio,3000);
    };
    start = new Date().getTime();
    audio[i].play();

    $("#btnPlay").fadeTo("slow",1,function(){
        $("#btnPlay").html("next");
    }).fadeTo("slow",1);
    i++;
    if ( i == audio.length ){
        alert("te pasaste");
    }
    if ( i == audio.length-threshold){
        getNewAudio();
    }
    iColores++;
    if (iColores == colores.length){iColores=0;}
    $('#myPanel').fadeTo('slow', 0, function() {
        $( this ).css("background-color", colores[iColores]);
    }).delay(300).fadeTo('slow', 1);
};

$(function () {
    $("#btnPlay").click(function() {
        clearTimeout(audioDelay);
        if ( i > 0 ){
            finDeAudio();
        }else{
            setTimeout(function(){
                clearTimeout(audioDelay);
                $("#btnPlay").unbind("click");
                if (!audio[i-1].ended){
                    finDeAudio();
                }
                console.dir(resultados);
                $.post('/saveSurvey',{surveyData:JSON.stringify(resultados)},function(data){

                    console.log("data sent");
                });
                //$("#myResults").html(JSON.stringify(resultados));
            }, tiempoDeEncuesta);
        }
        playAudio();
    });
});