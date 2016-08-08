/**********************************************************
*	MAIN SCREEN CONTROLLER
***********************************************************/

var selDelegacion

var ctrl_zona = {
	data : {},
	pageDiv : "#zonaP",
	response : null,
	init : function(data,template){
		ctrl_zona.data = data;
		ctrl_zona.getEstados();
		jqm.showLoader("Generando...");
	},
	getEstados : function(){
		
			$.ajax({
          type: 'GET',
            data: {},
            url: serverURL + '/api/readSucEstados',
            crossDomain: true,
            dataType: 'JSON'
             }).done(function( response ) {
             	ctrl_zona.response = response
             ctrl_zona.render(response);
          }).fail(function( response ) {
              alert("Error de conexión, intente nuevamente mas tarde.");   
    	});   
     
		
	},
	render : function(data){
		jqm.hideLoader();
		$(ctrl_zona.pageDiv).empty();

		var dItems = { items : data}
		console.log(dItems)

		var mainObj = template.render('#zonaT',ctrl_zona.pageDiv,dItems)
		$(ctrl_zona.pageDiv).trigger("create");
		//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		
		mainObj.on('getDel',function(event){
			selDelegacion = event.context._id;
			$.mobile.changePage( "#delegacion");
		})

		var  myScroll = new IScroll('#wrapperZona',{  
		 	click:true,useTransition:true,scrollbars:scrolls,mouseWheel:true,interactiveScrollbars: true })


		setTimeout(function(){ myScroll.refresh() }, 500);
		

	},
}