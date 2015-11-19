/**********************************************************
*	MAIN SCREEN CONTROLLER
***********************************************************/


var ctrl_listDesc = {
	data : {},
	pageDiv : "#listDescP",
	init : function(data,template){
		ctrl_listDesc.data = data;
		ctrl_listDesc.getLoc();
		jqm.showLoader("Generando...");
	},
	getLoc : function(){
		navigator.geolocation.getCurrentPosition(ctrl_listDesc.getQuery,null); 
	},
	getQuery : function(position){
		console.log(position)
		$.ajax({
          type: 'POST',
            data: {spec:paramsPage.id,lat:position.coords.latitude,lng:position.coords.longitude},
            url: serverURL + '/api/byListaDesc',
            crossDomain: true,
            dataType: 'JSON'
             }).done(function( response ) {
             ctrl_listDesc.render(response);
          }).fail(function( response ) {
              alert("Error de conexión, intente nuevamente mas tarde.");   
    	});   
	},
	render : function(data){
		jqm.hideLoader();
		$(ctrl_listDesc.pageDiv).empty();

		for (var i = 0; i < data.length; i++) {
			
			//search Item
			for (var a = 0; a < data[i].descuentos.length; a++) {
				if(data[i].descuentos[a].espec == paramsPage.id){
						data[i].descuentos.move(a,0)
				}
			};

			data[i].perc = parseInt(data[i].descuentos[0].perc);
		};

		data.sort(byProperty('perc'))
		data.reverse();

		data.sort(byProperty('dist'))



		var dItems = { items : data,  distVis:true}

		console.log(dItems)

		var mainObj = template.render('#listDescT',ctrl_listDesc.pageDiv,dItems)
		$(ctrl_listDesc.pageDiv).trigger("create");
		//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		
		mainObj.on('getList',function(event){
			console.log(event.context._id +"MAMAMIA")
			paramsPage = { id : event.context._id, type: "descListado" }
			$.mobile.changePage( "#list");
		})

		 myScroll = new IScroll('#wrapperListDesc',{  
		 	click:true ,scrollbars:scrolls,mouseWheel:true,interactiveScrollbars: true })
		

	},
}

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