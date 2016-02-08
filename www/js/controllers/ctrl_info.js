/**********************************************************
*	LIST CONTROLLER
***********************************************************/

var ctrl_info = {
	data : {},
	pageDiv : "#infoSucP",
	init : function(data,template){
		ctrl_info.data = data;
		ctrl_info.render();
	},
	render : function(){

		var data  = paramsSuc.data   
				
		console.log(data)		

		var mainObj = template.render('#infoT',ctrl_info.pageDiv,data)
		$(ctrl_info.pageDiv).trigger("create");

		mainObj.on('genMap',function(event){
			console.log(event.context)
			mapaObj = event.context;
			$.mobile.changePage( "#mapa");
			//window.location = "#mapa"
		})

		mainObj.on('navigate',function(){
			jqm.showLoader("Localizando...")
			navigator.geolocation.getCurrentPosition(ctrl_info.locRet,ctrl_info.onLocationError); 
			
		})
		
		 myScroll = new IScroll('#wrapperInfo',{  
		 	click:true,scrollbars:scrolls,mouseWheel:true,interactiveScrollbars: true })
		
		console.log("AQUI----------------------")
	},
	locRet : function(location){
		var data  = paramsSuc.data  
		jqm.hideLoader()
			window.open("http://maps.google.com/maps?saddr=My+Location&daddr="+ data.loc[0] +", "+ data.loc[1]+"&sensor=true" , '_system');
			console.log("http://maps.google.com/maps?saddr="+location.coords.latitude+ ", " + location.coords. longitude+  "&daddr="+ data.loc[0] +", "+ data.loc[1]+"&sensor=true")
	},
	onLocationError : function(){
		alert("No se puede obtener su locaclización GPS, por favor revise que la función este habilitada o que su GPS este en un rango operacional.")
	}
}