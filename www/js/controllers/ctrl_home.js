/**********************************************************
*	MAIN SCREEN CONTROLLER
***********************************************************/
descVar = ""

var ctrl_home = {
	data : {},
	pageDiv : "#mainScreen",
	init : function(data,template){
		ctrl_home.data = data;
		ctrl_home.render();
	},
	render : function(){


		$(ctrl_home.pageDiv).empty();

		ctrl_home.data  = {
			userData : {
				nombre 		: window.localStorage.getItem("nombre"),
				username 	: window.localStorage.getItem("username"),
				idCard		: window.localStorage.getItem("idCard"),
				cardHypen   : window.localStorage.getItem("idCard").replace(/(.{4})(.{4})(.{4})/,'$1 $2 $3 '),
				end			: window.localStorage.getItem("end"),
				vencimiento : utils.dateConv(window.localStorage.getItem("end")),
				ccv 		: window.localStorage.getItem("ccv"),
				
			},
			img 		: "noimage.png",
		}

		// check vencida

		var restantes = rh.restantes(ctrl_home.data.userData.end);
		if(restantes=="TARJETA VENCIDA"){
			alert("Tarjeta Vencida, por favor registre una nueva tarjeta")
				$.mobile.changePage("#insertCard")
		}else{
			 ctrl_home.mainObj = template.render('#mainT',ctrl_home.pageDiv,ctrl_home.data,null,{menuT : $('#menuT').html()})
			$(ctrl_home.pageDiv).trigger("create");
			//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			
			ctrl_home.mainObj.on('getCerca',function(event){
				
				mainC.clickAnim(event.node)
				paramsPage = { id : event.context._id, type: "cerca" }
				console.log("entro cercas")
				$.mobile.changePage("#list");
			})
			ctrl_home.mainObj.on('getDescuentos',function(event){
				mainC.clickAnim(event.node)
				paramsPage = { id : event.context._id, type: "descuentos" }
				$.mobile.changePage("#descuentos");
			})
			ctrl_home.mainObj.on('getZona',function(event){
				mainC.clickAnim(event.node)
				$.mobile.changePage("#zona");
			})
			ctrl_home.mainObj.on('getEspecialidad',function(event){
				mainC.clickAnim(event.node)
				$.mobile.changePage("#especialidadR");
			})
			ctrl_home.mainObj.on('getContacto',function(event){
				mainC.clickAnim(event.node)
				$.mobile.changePage("#contacto");
			})


			ctrl_home.mainObj.on('cerrarsesion',function(event){
				mainC.clickAnim(event.node)
				localStorage.clear();
				$.mobile.changePage("#firstP");
			});

			ctrl_home.mainObj.on('openLink',function(event){
				console.log(event.context)
				ctrl_home.updateClick(event.context.bannerId)
				window.open(event.context.urlLink, '_system')
				//navigator.app.loadUrl(event.context.urlLink,{openExternal:true})
			});

		}



		ctrl_home.getBanner();
		
		
		 //ctrl_home.getLocation();

	},
	getLocation: function(){
		navigator.geolocation.getCurrentPosition(ctrl_home.onLocationFound, ctrl_home.onLocationError,{maximumAge:3000,timeout:35000,enableHighAccuracy:false});
	},
	onLocationFound : function(position){
		
		var pos = position.coords;
		userLat = pos.latitude;
		userLng = pos.longitude;

		console.log(userLat + " - " + userLng + " user found")
	},onLocationError : function(){
		alert("No se puede obtener su locaclización GPS, por favor revise que la función este habilitada o que su GPS este en un rango operacional.")
	},
	updateClick : function(bannerId){
		$.ajax({
          type: 'POST',
            data: {bannerId:bannerId},
            url: serverURL + '/api/updateClick',
            crossDomain: true,
            dataType: 'JSON'
             }).done(function( response ) {
              	console.log(response)
          }).fail(function( response ) {
              console.log("banner error ")  
    	});   
	},
	getBanner : function(){
		$.ajax({
          type: 'POST',
            data: {},
            url: serverURL + '/api/getBanner',
            crossDomain: true,
            dataType: 'JSON'
             }).done(function( response ) {
             	ctrl_home.mainObj.set('img',response.imagenes[0].url)
             	ctrl_home.mainObj.set('urlLink',response.imagenes[0].urlLink)
             	ctrl_home.mainObj.set('bannerId',response._id)
              	console.log(response)
          }).fail(function( response ) {
              console.log("banner error ")  
    	});   
	}
	
}