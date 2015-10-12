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
				username 	: window.localStorage.getItem("username"),
				idCard		: window.localStorage.getItem("idCard"),
				end			: window.localStorage.getItem("end")
			}
		}


		console.log(data)
		var mainObj = template.render('#mainT',ctrl_home.pageDiv,data,null,{menuT : $('#menuT').html()})
		$(ctrl_home.pageDiv).trigger("create");
		//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		
		mainObj.on('getCerca',function(event){
			
			mainC.clickAnim(event.node)
			paramsPage = { id : event.context._id, type: "cerca" }
			console.log("entro cercas")
			$.mobile.changePage("#list");
		})
		mainObj.on('getDescuentos',function(event){
			mainC.clickAnim(event.node)
			paramsPage = { id : event.context._id, type: "descuentos" }
			$.mobile.changePage("#descuentos");
		})
		mainObj.on('getZona',function(event){
			mainC.clickAnim(event.node)
			$.mobile.changePage("#zona");
		})
		mainObj.on('getEspecialidad',function(event){
			mainC.clickAnim(event.node)
			$.mobile.changePage("#especialidadR");
		})
		mainObj.on('getContacto',function(event){
			mainC.clickAnim(event.node)
			$.mobile.changePage("#contacto");
		})


		mainObj.on('cerrarsesion',function(event){
			mainC.clickAnim(event.node)
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
	},onLocationError : function(){
		alert("No se puede obtener su locaclización GPS, por favor revise que la función este habilitada o que su GPS este en un rango operacional.")
	}
	
}