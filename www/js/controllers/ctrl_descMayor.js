/**********************************************************
*	MAIN SCREEN CONTROLLER
***********************************************************/


var ctrl_descMayor = {
	data : {},
	pageDiv : "#listMayorP",
	init : function(data,template){
		ctrl_descMayor.data = data;
		ctrl_descMayor.getQuery(paramsPage.id);
		jqm.showLoader("Generando...");
	},
	getLoc : function(){
		navigator.geolocation.getCurrentPosition(ctrl_descMayor.getQuery,null); 
	},
	getQuery : function(spec){
		$.ajax({
          type: 'POST',
            data: {spec:spec},
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

		console.log(data)
		jqm.hideLoader();
		$(ctrl_descMayor.pageDiv).empty();


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




/*for (var i = 0; i < data.length; i++) {
			dataType(data[i].descuentos)
			data[i].descuentos.sort(byProperty('perc'))
			data[i].descuentos.reverse();
		};
*/

		//data.sort(byProperty('dist'))

		var dItems = { items : data, distVis:true}

		console.log(dItems)

		var mainObj = template.render('#listMayorT',ctrl_descMayor.pageDiv,dItems)
		$(ctrl_descMayor.pageDiv).trigger("create");
		//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		
		mainObj.on('getSuc',function(event){
			console.log(event.context._id +"MAMAMIA")
			paramsSuc = { data : event.context }
			$.mobile.changePage( "#infoSuc");
		})

		 myScroll = new IScroll('#wrapperListDesc',{  
		 	click:true,scrollbars:scrolls,mouseWheel:true,interactiveScrollbars: true })
		

	},
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