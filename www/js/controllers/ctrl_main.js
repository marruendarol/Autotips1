
var deploy = "DEV"


if(window.StatusBar) {
  // org.apache.cordova.statusbar required
  StatusBar.styleDefault();
}



function handleClicks(e){
   console.log("ert")
}


// DOM Ready =============================================================
function onDeviceReady(){


    $.support.cors = true;
   initApp();
}

$(document).ready(function() {



    if(deploy=="DEV"){
        initApp();
    } else {
        document.addEventListener("deviceready", onDeviceReady, false);
    }
});

function initApp(){


  


   $.mobile.pageContainer = $('#container');
   $.mobile.defaultPageTransition = 'slide';
   //$.mobile.defaultHomeScroll = 0;
   $( "#pop1" ).popup();

   		mainC.init(ctrl_core.init)


  $('.bButton').bind( "tap",function(){
      
              // history.go(0)
               //write your code here                 
               $.mobile.back()
          //window.history.back();
          
  })

  $('.hButton').bind( "tap",function(){
      $.mobile.changePage("#mainScreen")
  })

 
}


function getLastKnownLocation(callback,errorF,refresh){

  var options = {
  enableHighAccuracy: true,
  timeout: 5000
};

  var errorF = errorF
  if(errorF==undefined) { errorF = function(err){ console.log(err)}}

    
          navigator.geolocation.getCurrentPosition(
          function(position){
            console.log(position)
           var objPos = {
              coords : {
              latitude : position.coords.latitude,
              longitude : position.coords.longitude }
           }
              localStorage.lastKnownPosition = JSON.stringify(objPos);
              callback(position); 
          },errorF,options);
    

    /*
     if(typeof localStorage.lastKnownPosition == "undefined" || refresh){
        console.log("getttging new position")
          navigator.geolocation.getCurrentPosition(
          function(position){
            console.log(position)
           var objPos = {
              coords : {
              latitude : position.coords.latitude,
              longitude : position.coords.longitude }
           }
              localStorage.lastKnownPosition = JSON.stringify(objPos);
              callback(position); 
          },errorF,options);
    }else{
        callback(JSON.parse(localStorage.lastKnownPosition)); 
    } */
}

//keytool -genkey -v -keystore expoina.keystore -alias expoina -keyalg RSA -keysize 2048 -validity 10000
//pabloneruda14


function openDeviceBrowser (externalLinkToOpen){  window.open(externalLinkToOpen, '_system', 'location=no');}


function onSuccess(location){
  console.log(location)
}

function onError(e){
  
}