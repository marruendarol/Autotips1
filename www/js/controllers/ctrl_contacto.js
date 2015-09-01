/**********************************************************
*	MAIN SCREEN CONTROLLER
***********************************************************/
var ctrl_contacto = {
	data : {},
	pageDiv : "#contactoP",
	init : function(data,template){
		ctrl_contacto.data = data;
		ctrl_contacto.render();
	},
	render : function(){

		$(ctrl_contacto.pageDiv).empty();

		var mainObj = template.render('#contactoT',ctrl_contacto.pageDiv,{},null)


		mainObj.on('sendComment',function(){
			
			console.log($('#comentario').val().length)
			if($('#comentario').val().length>2){
			ctrl_contacto.sendMsg();}
			else{
				jqm.popup( {text:"Mensaje requerido.",title:"Error."})
			}
		});

		$(ctrl_contacto.pageDiv).trigger("create");

	},
	sendMsg : function(){
		jqm.showLoader("Enviando mensaje...")
		var msg = "Mensaje de Autotips" + $('#comentario').val();
		var recipients = "rlopez@rlm.com.mx"
		var params = {mail:{msg : msg,recipients:recipients,subject:"Noticación Autotips:" + window.localStorage.getItem("username")}};
		dbC.query("/api/sendNotification","POST",params,ctrl_contacto.msgRet,params)
	},
	msgRet : function(response){
		jqm.hideLoader();
		$.mobile.changePage( "#contactoListo");
	}
}