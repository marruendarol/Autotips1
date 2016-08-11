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
	
		if(typeof paramsSuc != 'undefined'){
			ctrl_busqueda.txt = paramsSuc.txt
			ctrl_busqueda.getLoc()
			$('#busquedaI').val(paramsSuc.txt);
		}

		
	},
	getLoc : function(txt){
		getLastKnownLocation(ctrl_busqueda.getQuery,ctrl_busqueda.onLocationError,true); 
	},
	onLocationError : function(err){
		alert("No se puede obtener su locaclización GPS, por favor revise que la función este habilitada o que su GPS este en un rango operacional. " + err)
	},
	getQuery : function(position){
		$.ajax({
          type: 'POST',
            data: {lat:position.coords.latitude,lng:position.coords.longitude,txt:ctrl_busqueda.txt},
            url: serverURL + '/api/busqueda',
            crossDomain: true,
            dataType: 'JSON'
             }).done(function( response ) {
            console.log(response)
             for (var i = 0; i < response.length; i++) {
			
			//search Item
			for (var a = 0; a < response[i].descuentos.length; a++) {
				
				if(response[i].descuentos[a].espec.search(new RegExp(ctrl_busqueda.txt, "i"))!=-1){
						
						response[i].descuentos.move(a,0)
				}
			};
		};

			//response.sort(byProperty('perc'))
			//response.reverse();
			//$('#listviewB').empty()
			 ctrl_busqueda.mainObj.set('data',response)

			 if(response.length==0){
			 	ctrl_busqueda.mainObj.set('empty',true)
			 }else{
			 	ctrl_busqueda.mainObj.set('empty',false)
			 }

			myScroll.refresh();
             

         /*   var myHilitor = new Hilitor2(".nSucursal");
             myHilitor.setMatchType("open");
 			 myHilitor.remove();
 			 myHilitor.apply(txt);*/

          }).fail(function( response ) {
              alert("Error de conexión, intente nuevamente mas tarde.");   
    	});   
	},
	render : function(data){

		console.log(data)
		jqm.hideLoader();
		
		var data = {
			data: [],
			empty : false,
			busquedaStr : ""
		}

		
		ctrl_busqueda.mainObj = template.render('#busquedaT',ctrl_busqueda.pageDiv,{})
		$(ctrl_busqueda.pageDiv).trigger("create");
		//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		
		ctrl_busqueda.mainObj.on('getSearch',function(event){
			ctrl_busqueda.txt = event.context.busquedaStr;
			ctrl_busqueda.getLoc()
			//ctrl_busqueda.getQuery(event.context.busquedaStr)
		})

		ctrl_busqueda.mainObj.on('getSuc',function(event){
			console.log(event.context._id +"MAMAMIA")
			paramsSuc = { data : event.context, txt :  $('#busquedaI').val()}
			$.mobile.changePage( "#infoSuc");
		})


 myScroll = new IScroll('#wrapperBusqueda',{  
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