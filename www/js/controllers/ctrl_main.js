
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

  if ( device.platform === "iOS" ) {
   $.mobile.hashListeningEnabled = false;
}

   $.mobile.pageContainer = $('#container');
   $.mobile.defaultPageTransition = 'slideoverleft';
   //$.mobile.defaultHomeScroll = 0;
   $( "#pop1" ).popup();

   		mainC.init(ctrl_core.init)


  $('.bButton').bind( "tap",function(){
       if(device.platform === "iOS"){
                 history.go(0); 
               //write your code here                 
           }
       else{
          window.history.back();
           }
  })

  $('.hButton').bind( "tap",function(){
      $.mobile.changePage("#mainScreen")
  })

 
}


//keytool -genkey -v -keystore expoina.keystore -alias expoina -keyalg RSA -keysize 2048 -validity 10000
//pabloneruda14


function openDeviceBrowser (externalLinkToOpen){  window.open(externalLinkToOpen, '_system', 'location=no');}


function onSuccess(location){
  console.log(location)
}

function onError(e){
  
}