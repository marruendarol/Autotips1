/**********************************************************
*	MAIN SCREEN CONTROLLER
***********************************************************/
var ctrl_home = {
	data : {},
	pageDiv : "#mainScreen",
	init : function(data,template){
		ctrl_home.data = data;
		ctrl_home.render();
	},
	render : function(){


		$(ctrl_home.pageDiv).empty();

		var data  = {
			userData : {
				nombre 		: window.localStorage.getItem("nombre"),
				paterno 	: window.localStorage.getItem("paterno"),
				tarjetaID	: window.localStorage.getItem("tarjetaID")
			}
		}


		console.log(data)
		var mainObj = template.render('#mainT',ctrl_home.pageDiv,data,null,{menuT : $('#menuT').html()})
		$(ctrl_home.pageDiv).trigger("create");
		//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		
		mainObj.on('getCerca',function(event){
			paramsPage = { id : event.context._id, type: "cerca" }
			$.mobile.changePage("#list");
		})
		mainObj.on('getDescuentos',function(event){
			paramsPage = { id : event.context._id, type: "descuentos" }
			$.mobile.changePage("#descuentos");
		})
		mainObj.on('getZona',function(event){
			$.mobile.changePage("#zona");
		})
		mainObj.on('getEspecialidad',function(event){
			$.mobile.changePage("#especialidad");
		})
		mainObj.on('getContacto',function(event){
			$.mobile.changePage("#contacto");
		})


		mainObj.on('cerrarsesion',function(event){
			localStorage.clear();
			$.mobile.changePage("#firstP");
		})

		
		 ctrl_home.getLocation();

	},
	getLocation: function(){
		navigator.geolocation.getCurrentPosition(ctrl_home.onLocationFound, ctrl_home.onLocationError,{maximumAge:3000,timeout:35000,enableHighAccuracy:false});
	},
	onLocationFound : function(position){
		
		var pos = position.coords;
		userLat = pos.latitude;
		userLng = pos.longitude;

		console.log(userLat + " - " + userLng + " user found")
	},
	onLocationError : function(){
		console.log("drag location not found");
	}
}