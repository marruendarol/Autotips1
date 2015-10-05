/**********************************************************
*	MAIN SCREEN CONTROLLER
***********************************************************/


var ctrl_descMayor = {
	data : {},
	pageDiv : "#listMayorP",
	init : function(data,template){
		ctrl_descMayor.data = data;
		ctrl_descMayor.getLoc();
		jqm.showLoader("Generando...");
	},
	getLoc : function(){
		navigator.geolocation.getCurrentPosition(ctrl_descMayor.getQuery,null); 
	},
	getQuery : function(location){
		$.ajax({
          type: 'POST',
            data: {lat:location.coords.latitude,lng:location.coords.longitude},
            url: serverURL + '/api/byMayorDesc',
            crossDomain: true,
            dataType: 'JSON'
             }).done(function( response ) {
             ctrl_descMayor.render(response);
          }).fail(function( response ) {
              alert("Error de conexión, intente nuevamente mas tarde.");   
    	});   
	},
	render : function(data){
		jqm.hideLoader();
		$(ctrl_descMayor.pageDiv).empty();

		for (var i = 0; i < data.length; i++) {
			dataType(data[i].descuentos)
			data[i].descuentos.sort(byProperty('perc'))
			data[i].descuentos.reverse();
		};


		data.sort(byProperty('dist'))

		var dItems = { items : data, distVis:true}

		console.log(dItems)

		var mainObj = template.render('#listMayorT',ctrl_descMayor.pageDiv,dItems)
		$(ctrl_descMayor.pageDiv).trigger("create");
		//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		
		mainObj.on('getList',function(event){
			console.log(event.context._id +"MAMAMIA")
			paramsPage = { id : event.context._id, type: "descListado" }
			$.mobile.changePage( "#list");
		})

		 myScroll = new IScroll('#wrapperListDesc',{  
		 	click:true })
		

	},
}


function dataType(arr){
	for (var i = 0; i < arr.length; i++) {
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