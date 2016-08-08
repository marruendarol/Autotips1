/**********************************************************
*	MAIN SCREEN CONTROLLER
***********************************************************/


var ctrl_busqueda = {
	data : {},
	pageDiv : "#busquedaP",
	init : function(data,template){
		ctrl_busqueda.data = data;
		
		jqm.showLoader("Generando...");
		ctrl_busqueda.render();
	},
	getQuery : function(txt){
		$.ajax({
          type: 'POST',
            data: {spec:spec},
            url: serverURL + '/api/busqueda',
            crossDomain: true,
            dataType: 'JSON'
             }).done(function( response ) {
             ctrl_busqueda.render(response);
          }).fail(function( response ) {
              alert("Error de conexión, intente nuevamente mas tarde.");   
    	});   
	},
	render : function(data){

		console.log(data)
		jqm.hideLoader();
		
		ctrl_busqueda.mainObj = template.render('#busquedaT',ctrl_busqueda.pageDiv,{})
		$(ctrl_busqueda.pageDiv).trigger("create");
		//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		
		ctrl_busqueda.mainObj.on('getSearch',function(event){
			console.log(event.context._id +"MAMAMIA")
			paramsSuc = { data : event.context }
			$.mobile.changePage( "#infoSuc");
		})

		 myScroll = new IScroll('#wrapperListDesc',{  
		 	click:true,scrollbars:scrolls,mouseWheel:true,interactiveScrollbars: true })

		 ctrl_busqueda.mainObj.on('openLink',function(event){
				window.open(event.context.urlLink, '_system')
			});

		 ctrl_busqueda.getBanner();
		

	},
	getBanner : function(){
		$.ajax({
          type: 'POST',
            data: {},
            url: serverURL + '/api/getBanner',
            crossDomain: true,
            dataType: 'JSON'
             }).done(function( response ) {
             	ctrl_busqueda.mainObj.set('img',response.imagenes[0].url)
             	ctrl_busqueda.mainObj.set('urlLink',response.imagenes[0].urlLink)
              	
          }).fail(function( response ) {
              console.log("banner error ")  
    	});   
	}
}


function dataType(arr){
	for (var i = 0; i < arr.descuentos.length; i++) {
		arr[i].perc = parseInt(arr[i].perc)
	};
}

var byProperty = function(prop) {
    return function(a,b) {
        if (typeof a[prop] == "number") {
            return (a[prop] - b[prop]);
        } else {
            return ((a[prop] < b[prop]) ? -1 : ((a[prop] > b[prop]) ? 1 : 0));
        }
    };
};


Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};