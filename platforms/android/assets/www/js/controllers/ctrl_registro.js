/**********************************************************
*	MAIN SCREEN CONTROLLER
***********************************************************/
var ctrl_registro = {
	data : {},
	pageDiv : "#registro",
	init : function(data,template){
		ctrl_registro.data = data;
		ctrl_registro.render();
	},
	render : function(){

		$(ctrl_registro.pageDiv).empty();

		var mainObj = template.render('#registroT',ctrl_registro.pageDiv,{},null)

		mainObj.on('regrdy',function(){
			$.mobile.changePage( "#login");
		});

		mainObj.on('ingresar',function(){
			$.mobile.changePage( "#mainScreen");

			mainObj.on('cancelar',function(){
			$.mobile.changePage( "#firstP" );
		});

		$(ctrl_registro.pageDiv).trigger("create");

		$(document).foundation();  // Refresh for tooltips
		

		// Data Validation
		$('#dataForm')
		  .on('invalid', function () {
		    var invalid_fields = $(this).find('[data-invalid]');
		  })
		  .on('valid', function () {
		  		ctrl_pj.update(ctrl_pj.redirect,1);
		  });	


	},
	validCard : function(){
		var params = {};
		dbC.query("../api/checkCard","POST",params,ctrl_pj.validReturn)
	},
	validReturn : function(response){
		console.log(response)
	},
	getDataObj :function(){
		var dataObj = {};
		dataObj.nombre		  	= $("#nombre").val(); 
		dataObj.paterno		  	= $("#paterno").val(); 
		dataObj.materno		  	= $("#materno").val(); 
		dataObj.email		  	= $("#email").val(); 
		dataObj.telefono		= $("#telefono").val(); 
		dataObj.movil		  	= $("#movil").val(); 
		dataObj.tarjetaID		= $("#tarjetaID").val(); 
		dataObj.orTarjeta		= $("#orTarjeta").val(); 
		dataObj.password		= $("#password").val(); 

	    dataObj.clients				= ctrl_pj.data.clients || null
	   
    
    	return dataObj;
	},
	create:function(){

		// Client Obj
		var item = {	idClient 	: ctrl_menu.idClient,
						name		: ctrl_menu.client,
						ts 			: utils.generateTS(),
						id 			: utils.generateUUID()};

		var params = {}
		params.dataB = {}  //ctrl_pj.getDataObj(); 
		params.dataB.clients = [item];
		params.route = ctrl_pj.route;
		params.dataB.userID = [ctrl_user.userInfo._id];
		params.dataB.estRCD = 1;
		dbC.query("../api/createUserMobile","POST",params,ctrl_pj.create_Return)
	},
	create_Return : function(data){
		ctrl_pj._id = data.data._id;
		ctrl_pj.render(data)	
	}
}