/**********************************************************
*	LIST CONTROLLER
***********************************************************/

distVis = false;
titleList = "Sucursales";
var spec = "";

var ctrl_list = {
	data : {},
	pageDiv : "#listPCont",
	init : function(data,template){
		console.log('LOGER')
		ctrl_list.data = data;
		$(ctrl_list.pageDiv).empty();
		

		console.log(paramsPage)

		switch(paramsPage.type){
			case "zona" : titleList="Zonas";distVis=false;ctrl_list.byZona(paramsPage.id);break;
			case "cerca" : titleList="Cerca de mí";distVis=true;ctrl_list.getGeo();break;
			case "especialidad" : titleList="Por Especialidad";distVis=false;ctrl_list.byEspec(paramsPage.id);break;
			case "descListado" : titleList="Listado descuentos";distVis=true;ctrl_list.byListaDesc(paramsPage.id);break;
			case "descPorc" :  titleList="Mayores Descuentos";distVis=true;ctrl_list.byPercDesc();break;
			case "descEspec" : distVis=false;ctrl_list.byZona(paramsPage.id);break;
			case "descZona" : distVis=false;ctrl_list.byDescCerca();break;
		}
	//--------------------------------------------ZONA
	},
	byZona : function(id){
		dbC.query("/api/byZona","POST",{id:id},ctrl_list.render)
	},
	//-------------------------------------------CERCA
	getGeo : function(){
		jqm.showLoader("buscando ubicación...");
		getLastKnownLocation(ctrl_list.geoRet,ctrl_list.onLocationError,true)

		//getLastKnownLocation(ctrl_list.geoRet,ctrl_list.onLocationError,true); 
	},
	geoRet : function(location){
		dbC.query("/api/byGeo","POST",{lat:location.coords.latitude,lng:location.coords.longitude},ctrl_list.render)
	},
	onLocationError : function(err){
		console.log("error de geo pos ")
		alert("No se puede obtener su locaclización GPS, por favor revise que la función este habilitada o que su GPS este en un rango operacional. " + err)
	},
	//------------------------------------------ESPECIALIDAD
	byEspec : function(id){
		jqm.showLoader("buscando ubicación...");
		dbC.query("/api/byEspec","POST",{id:id},ctrl_list.render)
	},
	//------------------------------------------LISTADO DE DESCUENTOS
	byListaDesc : function(specV){
		jqm.showLoader("buscando...");
		spec = specV;
		getLastKnownLocation(ctrl_list.listaDescLoc,ctrl_list.onLocationError,true); 
	},
	listaDescLoc : function(location){
		jqm.showLoader("buscando...");
		console.log(spec+"SPECVVV")
		dbC.query("/api/byListaEspecGeo","POST",
			{lat:location.coords.latitude,
			lng:location.coords.longitude,
			spec : spec
		},ctrl_list.render)
	},
	//------------------------------------------MAYOR PORCENTAJE GEO
	byPercDesc : function(){
		jqm.showLoader("buscando...");
		getLastKnownLocation(ctrl_list.PercDescLoc,ctrl_list.onLocationError,true); 
	},
	PercDescLoc : function(location){
		jqm.showLoader("buscando...");
		dbC.query("/api/byListaPercGeo","POST",
			{lat:location.coords.latitude,
			lng:location.coords.longitude
		},ctrl_list.render)
	},
	//------------------------------------------DESCUENTOS POR ESPECIALIDAD
	byDescEspec : function(){
		dbC.query("/api/byDescEspec","POST",{},ctrl_list.render)
	},
	//------------------------------------------POR ESTADO
	byDescEstado : function(){
		dbC.query("/api/byDescEstado","POST",{},ctrl_list.render)
	},
	//------------------------------------------DESCUENTOS CERCA DE MI 
	byDescCerca : function(){
		navigator.geolocation.getCurrentPosition(ctrl_list.geoRet,null); 
	},
	descCercaRet : function(location){
		dbC.query("/api/byDescCerca","POST",{lat:lat,lng:lng},ctrl_list.render)
	},
	//-----------------------------------------------------------
	render : function(data){


		jqm.hideLoader();
		
		var datar = { items  : data,
					distVis : distVis,
					empty 	: (data.length==0 ? true : false),
					img 		: "noimage.png",
			}

		$('#titleList').text(titleList)

		ctrl_list.mainObj = template.render('#listT',ctrl_list.pageDiv,datar)

		ctrl_list.mainObj.on('listDetail',function(event){
			mainC.clickAnim(event.node)
			paramsSuc = { data : event.context }
			$.mobile.changePage( "#infoSuc");
		});

		$(ctrl_list.pageDiv).trigger("create");
		//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		 myScroll = new IScroll('#wrapperList',{  
		 	click:true,useTransition:true,scrollbars:scrolls,mouseWheel:true,interactiveScrollbars: true })

		 ctrl_list.mainObj.on('openLink',function(event){
				window.open(event.context.urlLink, '_system')
			});
		
		ctrl_list.getBanner();

	},
	getBanner : function(){
		$.ajax({
          type: 'POST',
            data: {},
            url: serverURL + '/api/getBanner',
            crossDomain: true,
            dataType: 'JSON'
             }).done(function( response ) {
             	ctrl_list.mainObj.set('img',response.imagenes[0].url)
             	ctrl_list.mainObj.set('urlLink',response.imagenes[0].urlLink)
              	
          }).fail(function( response ) {
              console.log("banner error ")  
    	});   
	}
}