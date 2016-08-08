/**********************************************************
*	MAIN SCREEN CONTROLLER
***********************************************************/
var ctrl_anadir = {
	data : {},
	pageDiv : "#insertCardP",

	life : "",
	init : function(data,template){
		ctrl_anadir.data = data;
		ctrl_anadir.render();
	},
	render : function(){

		$(ctrl_anadir.pageDiv).empty();

		var mainObj = template.render('#cardT',ctrl_anadir.pageDiv,{},null)

		$(document).foundation();  // Refresh for tooltips

		mainObj.on('validate',function(){
			jqm.showLoader("verificando tarjeta...");
			ctrl_anadir.validateCard($("#cardA").val());
		});	

		mainObj.on('cancelar',function(){
			$.mobile.changePage( "#firstP" );
		});

		$(ctrl_anadir.pageDiv).trigger("updateCard");

		  	 myScroll = new IScroll('#wrapperReg',{ click:true })
 	 

	},
	validateCard : function(code,ccv){
		var params = {code:code,username:window.localStorage.getItem("username")};
		dbC.query("/api/addCode","POST",params,ctrl_anadir.validReturn)
	},
	validReturn : function(response){

		jqm.hideLoader();



		if(response.res==0){
			jqm.popup( {text:"El código no es válido.",title:"Error."})

		}
		
		if(response.res==1){
			jqm.popup( {text:"Ese código ya ha sido registrado.",title:"Error."})	
		}

		if(response.res==2){
			
			ctrl_loginS.checkLogin({username:window.localStorage.getItem("username"),password:window.localStorage.getItem("password")})
			//jqm.popup( {text:"Codigo actualizado éxito.",title:"Actualizado."})	
		}
		
	},
}