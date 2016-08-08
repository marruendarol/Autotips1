/**********************************************************
*	CORE CONTROLLER
***********************************************************/

var ctrl_core = {

	path : "",
	id 	 : "",
	loadedControllers : [],
	init : function(){	
		ctrl_core.routeListeners();

		// login?
			var endDate = window.localStorage.getItem("end");

			console.log(utils.generateTS())
			console.log(parseInt(endDate))

			if(utils.generateTS()>parseInt(endDate))
			{
				//alert("Tarjeta Vencida, por favor registre una nueva tarjeta")
				
			}

			var username= window.localStorage.getItem("username");
			if(username!=undefined){
				ctrl_loginS.checkLogin({username:window.localStorage.getItem("username"),password:window.localStorage.getItem("password")})
			}else{
				$.mobile.changePage("#firstP")
			}

	  		
	},
	loadController : function(controllerURL,params,reload){
		
		if(reload || ctrl_core.loadedControllers.indexOf(controllerURL)==-1){
			$.ajax({
	        type: "GET",
	        url: controllerURL,
	        dataType: "script",
	        error: function (XMLHttpRequest, textStatus, errorThrown) {
	            console.log(textStatus, errorThrown);
	        },
	        success:function(e){
	         	eval(params.init)(params);
	        }
    		});
		}else{
			eval(params.init)(params);
		}
		ctrl_core.loadedControllers.push(controllerURL)
		
	},
	routeListeners : function(){

		
		$(document).on("pagebeforeshow","#initialBlank", function() {
	       	var username= window.localStorage.getItem("username");
			if(username!=undefined){
				$.mobile.changePage("#mainScreen")
			}else{
				$.mobile.changePage("#firstP")
			}
	    });

		$(document).on("pagebeforeshow","#firstP", function() {
	        var params = { init : 'ctrl_first.init' }
	    	ctrl_core.loadController("./js/controllers/ctrl_first.js",params);
	    });

		$(document).on("pagebeforeshow","#login", function() {
	        	        var params = { init : 'ctrl_loginS.init' }
	    	ctrl_core.loadController("./js/controllers/ctrl_loginS.js",params);
	    });

		$(document).on("pagebeforeshow","#insertCard", function() {
	        var params = { init : 'ctrl_anadir.init', }
	    	ctrl_core.loadController("./js/controllers/ctrl_anadir.js",params);
	    });

	    $(document).on("pagebeforeshow","#registro", function() {
	        var params = { init : 'ctrl_registro.init', }
	    	ctrl_core.loadController("./js/controllers/ctrl_registro.js",params);
	    });

	    $(document).on("pagebeforeshow","#recuperar", function() {
	        var params = { init : 'ctrl_recuperar.init' }
	    	ctrl_core.loadController("./js/controllers/ctrl_recuperar.js",params);
	    });

	
		$(document).on("pagebeforeshow","#mainScreen", function() {
	        var params = { init : 'ctrl_home.init' }
	    	ctrl_core.loadController("./js/controllers/ctrl_home.js",params);
	    });

	    $(document).on("pagebeforeshow","#list", function() {
	    	console.log("invocando list")
	      	var params = { init : 'ctrl_list.init' }
	    	ctrl_core.loadController("./js/controllers/ctrl_list.js",params);
	    });

	    $(document).on("pagebeforeshow","#especialidadR", function() {
	      	var params = { init : 'ctrl_especR.init' }
	    	ctrl_core.loadController("./js/controllers/ctrl_especialidadR.js",params);
	    });

	    $(document).on("pagebeforeshow","#especialidad", function() {
	      	var params = { init : 'ctrl_espec.init' }
	    	ctrl_core.loadController("./js/controllers/ctrl_especialidad.js",params);
	    });

	    $(document).on("pagebeforeshow","#zona", function() {
	      	var params = { init : 'ctrl_zona.init' }
	    	ctrl_core.loadController("./js/controllers/ctrl_zona.js",params,false);
	    });

	    $(document).on("pagebeforeshow","#delegacion", function() {
	      	var params = { init : 'ctrl_delegacion.init' }
	    	ctrl_core.loadController("./js/controllers/ctrl_delegacion.js",params);
	    });

	    $(document).on("pagebeforeshow","#descuentos", function() {
	      	var params = { init : 'ctrl_descMayor.init' }
	    	ctrl_core.loadController("./js/controllers/ctrl_descMayor.js",params);
	    });

	    // Descuentos -----------------------------------------------------------------

	     $(document).on("pagebeforeshow","#listDesc", function() {
	      	var params = { init : 'ctrl_listDesc.init' }
	    	ctrl_core.loadController("./js/controllers/ctrl_listDesc.js",params);
	    });

	     $(document).on("pagebeforeshow","#busqueda", function() {
	      	var params = { init : 'ctrl_busqueda.init' }
	    	ctrl_core.loadController("./js/controllers/ctrl_busqueda.js",params);
	    });

	      $(document).on("pagebeforeshow","#descMayor", function() {
	      	var params = { init : 'ctrl_descMayor.init' }
	    	ctrl_core.loadController("./js/controllers/ctrl_descMayor.js",params);
	    });

	    $(document).on("pagebeforeshow","#especDesc", function() {
	      	var params = { init : 'ctrl_especDesc.init' }
	    	ctrl_core.loadController("./js/controllers/ctrl_especDesc.js",params);
	    }); 

	    $(document).on("pagebeforeshow","#zonaDesc", function() {
	      	var params = { init : 'ctrl_zonaDesc.init' }
	    	ctrl_core.loadController("./js/controllers/ctrl_zonaDesc.js",params);
	    }); 

	    //----------------------------------------------------------------------------


	    $(document).on("pagebeforeshow","#mapa", function() {
	      	var params = { init : 'ctrl_mapa.init' }
	    	ctrl_core.loadController("./js/controllers/ctrl_mapa.js",params);
	    });

	    $(document).on("pagebeforeshow","#infoSuc", function() {
	      	var params = { init : 'ctrl_info.init' }
	    	ctrl_core.loadController("./js/controllers/ctrl_info.js",params);
	    });

	    $(document).on("pagebeforeshow","#contacto", function() {
	      	var params = { init : 'ctrl_contacto.init' }
	    	ctrl_core.loadController("./js/controllers/ctrl_contacto.js",params);
	    });

	     $(document).on("pagebeforeshow","#incidencia", function() {
	      	var params = { init : 'ctrl_incidencia.init' }
	    	ctrl_core.loadController("./js/controllers/ctrl_incidencia.js",params);
	    });
	}

}