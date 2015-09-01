/**********************************************************
*	MAIN SCREEN CONTROLLER
***********************************************************/
var ctrl_loginS = {
	data : {},
	pageDiv : "#loginP",
	init : function(data,template){
		ctrl_loginS.data = data;
		ctrl_loginS.render();
	},
	render : function(){

		$(ctrl_loginS.pageDiv).empty();

		var mainObj = template.render('#loginT',ctrl_loginS.pageDiv,{},null)

		mainObj.on('ingresar',function(){
			var user = $('#name').val();
			var pass = $('#password').val();
			jqm.showLoader("ingresando...");
			ctrl_loginS.checkLogin({username:user,password:pass})
		});

			mainObj.on('cancelar',function(){
			$.mobile.changePage( "#firstP");
		});



		$(ctrl_loginS.pageDiv).trigger("create");

	},
	checkLogin : function(data){
        $.ajax({
            type: 'POST',
            data: data,
            url: serverURL + '/api/loginiuser',
            dataType: 'JSON'
            }).done(function( response ) {
              	jqm.hideLoader();
            	if(response!=null){
            		console.log(response)
            		window.localStorage.setItem("username", response.username);
            		window.localStorage.setItem("nombre", response.nombre);
            		window.localStorage.setItem("idCard", response.idCard);
    				
            		ctrl_loginS.changePage();	
            	}else{
            		console.log("que onda")
            		jqm.popup( {text:"Usuario y/o contraseña inválido",title:"Error."})
            	}
            	
        });	
	},
	changePage : function(){
		$.mobile.changePage( "#mainScreen", {});
	}
}