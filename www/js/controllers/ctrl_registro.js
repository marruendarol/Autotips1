/**********************************************************
*	MAIN SCREEN CONTROLLER
***********************************************************/
var ctrl_registro = {
	data : {},
	pageDiv : "#registroP",
	card : {},
	init : function(data,template){
		ctrl_registro.data = data;
		ctrl_registro.render();
	},
	render : function(){

		$(ctrl_registro.pageDiv).empty();

		var mainObj = template.render('#registroT',ctrl_registro.pageDiv,{},null)

		$(document).foundation();  // Refresh for tooltips

		mainObj.on('validate',function(){
			jqm.showLoader("verificando tarjeta...");
			ctrl_registro.validateCard($("#card").val());
		});	

		mainObj.on('cancelar',function(){
			$.mobile.changePage( "#firstP" );
		});

		$(ctrl_registro.pageDiv).trigger("create");

		  	 myScroll = new IScroll('#wrapperReg',{  
		 	click:true })
 	 

	},
	validateCard : function(idCard){
		ctrl_registro.card = idCard;
		var params = {idCard:idCard};
		dbC.query("/api/checkCard","POST",params,ctrl_registro.validReturn)
	},
	validReturn : function(response){

		jqm.hideLoader();

		console.log(response)
		if(response.length==1 && response[0].estatus==0 ){
			
			ctrl_registro.create();

		}

		if(response.length==0){
			jqm.popup( {text:"El ID de la tarjeta no es válido.",title:"Error."})

		}
		
		if(response.length==1 && response[0].estatus==1){
			jqm.popup( {text:"Esa ya ha sido registrada. verifique de nuevo o pongase en contacto con su proveedor",title:"Error."})	
		}
	},
	getDataObj :function(){
		var dataObj = {};
		var errs = [];
		dataObj.nombre		  	= $("#nombre").val(); 
		dataObj.username 	 	= $("#email").val(); 
		dataObj.password	 	= $("#pass").val(); 
		dataObj.cpass		  	= $("#cpass").val(); 
		dataObj.idcard		  	= $("#idcard").val(); 
		dataObj.origen		  	= $("#origen").val(); 


		ctrl_registro.username = dataObj.username;
		ctrl_registro.password = dataObj.password;

		if(dataObj.nombre.length<2) { errs.push("Nombre requerido")}
		if(dataObj.username.length<2) { errs.push("Correo electrónico Requerido")}
		if(dataObj.password.length<2) { errs.push("Contraseña requerida")}
		if(dataObj.password!=dataObj.cpass) { errs.push("Las contraseñas no coinciden")}


		if(errs.length==0){
			return dataObj;
		}else{
			jqm.hideLoader();
			jqm.popup( {text:errs.toString(),title:"Error."})
		}

    	
	},
	create:function(){
		jqm.showLoader("creando usuario...");
		// Client Obj
		var item = {	ts 			: utils.generateTS(),
						id 			: utils.generateUUID()};

		var params = {}
		params.dataB = ctrl_registro.getDataObj(); 
		params.dataB.clients = [item];
		params.dataB.userID = "internet"
		params.dataB.estRCD = 1;
		params.dataB.idCard = ctrl_registro.card 
		dbC.query("/api/createUserMobile","POST",params,ctrl_registro.create_Return)
	},
	create_Return : function(data){
		var params = {idCard:ctrl_registro.card }
		dbC.query("/api/updateCard","POST",params,ctrl_registro.updateCardRet)	
	},
	updateCardRet : function(){
		console.log(ctrl_registro.username)
		console.log(ctrl_registro.pass)
		ctrl_loginS.checkLogin({username:ctrl_registro.username,password:ctrl_registro.password})
	}
}