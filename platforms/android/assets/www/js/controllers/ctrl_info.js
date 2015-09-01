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
				

		var mainObj = template.render('#infoT',ctrl_info.pageDiv,data)
		$(ctrl_info.pageDiv).trigger("create");

		mainObj.on('genMap',function(event){
			console.log(event.context)
			mapaObj = event.context;
			$.mobile.changePage( "#mapa");
			//window.location = "#mapa"
		})

		mainObj.on('navigate',function(){
			window.open("http://maps.google.com/maps?saddr=43.0054446,-87.9678884&daddr=42.9257104,-88.0508355" , '_system');
		})
		
	}
}