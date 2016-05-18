/**********************************************************
*	LIST CONTROLLER
***********************************************************/

var ctrl_info = {
	data : {},
	pageDiv : "#infoSucP",

	init : function(data,template){

		console.log(data)
		ctrl_info.data = data;
		ctrl_info.render();
	},
	render : function(){

		var data  = paramsSuc.data 
		data.stars = [{id:1},{id:2},{id:3},{id:4},{id:5}]  
				
		console.log(data)		

		var mainObj = template.render('#infoT',ctrl_info.pageDiv,data)
		$(ctrl_info.pageDiv).trigger("create");

		mainObj.on('genMap',function(event){
			console.log(event.context)
			mapaObj = event.context;
			$.mobile.changePage( "#mapa");
			//window.location = "#mapa"
		})

		mainObj.on('navigate',function(){
			jqm.showLoader("Localizando...")
			ctrl_info.locRet()
			//navigator.geolocation.getCurrentPosition(ctrl_info.locRet,ctrl_info.onLocationError); 
			
		})

		mainObj.on('dial',function(e){
			window.open('tel:'+e.context.telefono1, '_system')
			
		})


		mainObj.on('incidencia',function(event){
			paramsInc = ctrl_info.data;
			$.mobile.changePage( "#incidencia");	
		})
		
		
		
		console.log("AQUI----------------------")

		mainObj.on('selStar',function(e){
			console.log(e.context)
			ctrl_info.setStars(e.context.id)
			ctrl_info.storeRate(parseInt(e.context.id))	
		})
		mainObj.on('hoverStar',function(e){
			ctrl_info.setHover(e.context.id)
		})
		
		console.log(data)
		ctrl_info.setStars(data.rate)

		var  myScroll = new IScroll('#wrapperInfo',{  
		 	click:true,scrollbars:scrolls,mouseWheel:true,interactiveScrollbars: true })


		setTimeout(function(){ myScroll.refresh() }, 500);
		

	},
	setHover : function(value){
		console.log("hover")
		$('.star').removeClass("star-hover")
		$('.star').removeClass("star-fill")
		if(value>0) { $('#star0').addClass('star-hover') }
		if(value>1) { $('#star1').addClass('star-hover') }
		if(value>2) { $('#star2').addClass('star-hover') }
		if(value>3) { $('#star3').addClass('star-hover') }
		if(value>4) { $('#star4').addClass('star-hover') }
	},
	setStars : function(value){

		$('.star').removeClass("star-fill")
		if(value>0) { $('#star0').addClass('star-fill') }
		if(value>1) { $('#star1').addClass('star-fill') }
		if(value>2) { $('#star2').addClass('star-fill') }
		if(value>3) { $('#star3').addClass('star-fill') }
		if(value>4) { $('#star4').addClass('star-fill') }


	},
	storeRate : function(rate){

		console.log(ctrl_info.data)

		var params = {userId: window.localStorage.getItem("userId") ,
		 			 rate : rate ,
		 			 sucID : paramsSuc.data._id
		 		}

		dbC.query("/api/addRate","POST",params,ctrl_info.rateRet,ctrl_info.rateError)	
		jqm.showLoader("Enviando calificación...")
	},
	rateRet : function(){
		jqm.hideLoader();
		jqm.popup( {text:"Tu calificación ha sido agregada con exito, gracias.",title:"Enviado."});


	},
	rateError : function(){
		jqm.popup( {text:"Error de conexión.",title:"Error."});
	},
	locRet : function(){
		var data  = paramsSuc.data  
		jqm.hideLoader()

		var geocoords =data.loc[0] +','+data.loc[1];

		if (device.platform=="iOS") {
		  window.open('maps://?q=' + geocoords, '_system');
		}
		else {
		  //var label = encodeURI('Negocio Autotips'); // encode the label!
		  window.open('geo:0,0?q=' + geocoords, '_system');
		}

			/*window.open("http://maps.google.com/maps?saddr=My+Location&daddr="+ data.loc[0] +", "+ data.loc[1]+"&sensor=true" , '_system');
			window.open("geo:"+addressLongLat);
			console.log("http://maps.google.com/maps?saddr="+location.coords.latitude+ ", " + location.coords. longitude+  "&daddr="+ data.loc[0] +", "+ data.loc[1]+"&sensor=true")*/
	},
	onLocationError : function(){
		alert("No se puede obtener su locaclización GPS, por favor revise que la función este habilitada o que su GPS este en un rango operacional.")
	}
}