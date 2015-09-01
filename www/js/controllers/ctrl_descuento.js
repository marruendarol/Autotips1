/**********************************************************
*	MAIN SCREEN CONTROLLER
***********************************************************/
var ctrl_descuento = {
	data : {},
	pageDiv : "#descuentosP",
	init : function(data,template){
		ctrl_descuento.data = data;
		ctrl_descuento.render();
	},
	render : function(){


		$(ctrl_descuento.pageDiv).empty();

		var data  = {}

		var mainObj = template.render('#descuentoT',ctrl_descuento.pageDiv,data)
		$(ctrl_descuento.pageDiv).trigger("create");
		//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

		mainObj.on('listDesc',function(event){
			paramsPage = {  type: "listDesc" }
			$.mobile.changePage("#listDesc");
		})
		mainObj.on('porcDesc',function(event){
			paramsPage = { type: "descPorc" }
			$.mobile.changePage("#list");
		})
		mainObj.on('especDesc',function(event){
			$.mobile.changePage("#especDesc");
		})
		mainObj.on('zonaDesc',function(event){
			$.mobile.changePage("#zonaDesc");
		})
		

	},
}