/**********************************************************
*	LIST CONTROLLER
***********************************************************/

var ctrl_list = {
	data : {},
	pageDiv : "#listPCont",
	init : function(data,template){
		ctrl_list.data = data;
		ctrl_list.render();

		jqm.showLoader("buscando...");

		switch(paramsPage.type){
			case "zona" : ctrl_list.byZona(paramsPage.id);break;
			case "cerca" : ctrl_list.getGeo();break;
			case "descuento" : ctrl_list.byZona(paramsPage.id);break;
			case "especialidad" : ctrl_list.byEspec(paramsPage.id);break;
		}

	},
	byZona : function(id){
		dbC.query("/api/byZona","POST",{id:id},ctrl_list.render)
	},
	getGeo : function(){
		navigator.geolocation.getCurrentPosition(ctrl_list.geoRet,null); 
	},
	geoRet : function(location){
		
		ctrl_list.byGeo(location.coords.latitude,location.coords.longitude)
	},
	byGeo : function(lat,lng){
		dbC.query("/api/byGeo","POST",{lat:lat,lng:lng},ctrl_list.render)
	},
	byEspec : function(id){
		dbC.query("/api/byEspec","POST",{id:id},ctrl_list.render)
	},
	render : function(data){

		jqm.hideLoader();
		var data = { items : data}

		console.log(data + " RTY")

		var mainObj = template.render('#listT',ctrl_list.pageDiv,data)

		mainObj.on('listDetail',function(event){
			paramsSuc = { data : event.context }
			$.mobile.changePage( "#infoSuc");
		});

		$(ctrl_list.pageDiv).trigger("create");
		//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		 myScroll = new IScroll('#wrapperList',{  
		 	click:true })
		

	}
}