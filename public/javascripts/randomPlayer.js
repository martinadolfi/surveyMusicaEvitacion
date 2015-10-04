/**
 * Created by MartinG on 9/27/2015.
 */
var myID = 0;
var audio = [new Audio('audio/001.mp3'),new Audio('audio/002.mp3'),new Audio('audio/003.mp3'),new Audio('audio/004.mp3'),new Audio('audio/005.mp3'),new Audio('audio/006.mp3'),new Audio('audio/007.mp3'),new Audio('audio/008.mp3')];
var i=0;
var resultados=[];
var tiempoDeEncuesta=20000;
var colores=["yellow","red","blue","black","green","pink","violet"];
var iColores=0;
var start,end={};
var cron=0;
var audioDelay={};
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
        alert("te pasas");
    }
    iColores++;
    if (iColores == colores.length){iColores=0;}
    $('#myPanel').fadeTo('slow', 0.3, function() {
        $( this ).css("background-color", colores[iColores]);
    }).delay(1000).fadeTo('slow', 1);
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
                console.log(resultados);
                $("#myResults").html(JSON.stringify(resultados));
            }, tiempoDeEncuesta);
        }
        playAudio();
    });
});