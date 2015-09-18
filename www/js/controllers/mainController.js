/**********************************************************
*	MAIN CONTROLLER
***********************************************************/

var userLat = 20.6596
var userLng = -103.3496
var serverURL = "http://autotips.mx:3018";
//var serverURL = "http://localhost:3018";
var paramsPage = {}

var mainC = {
	init: function(callback){
		mainC.initFoundation();
		mainC.loadTemplateFile(callback)
	},
	initFoundation : function(){
		$(document).foundation();
		$(document).foundation('alert','events');

		// Abide Validation
		$(document).foundation('abide', {
	      patterns: {
	        short_field: /^.{,40}$/,
	        long_field: /^.{,72}$/
	      }
    	}); 
	},
	loadTemplateFile: function(callback){
		$("#templateLoader").load("./templates/views.html",function(){
			callback();
		}); 
	},
	comboArray : function(extra){
		$(extra.div).append('<option value="" disabled selected>'+extra.placeholder+'</option>')
		for (var a in extra.arr){
			$(extra.div).append('<option value="'+ extra.arr[a][extra.value] +'">' + extra.arr[a][extra.label] +'</option>')
		}
		if(extra.defaultVal!=null){
			$(extra.div).val(extra.defaultVal);
		}
	}
}

var jqm = {
	showLoader : function(text){
		console.log("show loader")
		$.mobile.loading( "show", {
		  text: text || "",
		  textVisible: true,
		  theme: "z",
		  html: ""
		});
	},
	hideLoader : function(){
		console.log("hide loader")
		$.mobile.loading( "hide", {
		  text: "",
		  textVisible: true,
		  theme: "z",
		  html: ""
		});
	},
	popup : function(params){
		$('#pop_Title').html(params.title)
		$('#pop_text').html(params.text)
		$( "#pop1" ).popup( "open" )
	}
}

/**********************************************************
*	FOUNDATION CONTROLLERS
***********************************************************/
var foundationJS = {
	createAlert : function(msg,div,tipo){
		template.render('#alertT',div,{msg:msg,tipo:tipo});
	}
}


/**********************************************************
*	TEMPLATE RENDERER
***********************************************************/
var template = {
	render: function(template,output,data,callback,partials){
		var options = {
		  el: output,
		  template:  template,
		  partials: partials,
		  data : data
		}
		// BIND HELPERS
		for (var a in rh){
			options.data[a] = rh[a];
		}
		var ractive = new Ractive(options);
		// IF CALLBACK
		if(callback) { callback()};
		return ractive;
	},
	setListeners : function(){

	},
	update: function(){

	},

}


/**********************************************************
*	DATABASE CONTROLLER
***********************************************************/
var dbC = {
	query : function(url,type,params,callback,errorCB,extra){
		 $.ajax({
	        type: type,
	        data: params,
	        crossDomain: true,
            url: serverURL + url,
	        dataType: 'JSON',
	        }).done(function( response ) {
        		if(callback) { callback(response,extra) }
	        }).fail(function( response ) {
	           	console.log("fail query",response,extra);
	           	if(errorCB) { errorCB(response,extra) }
	    }); 
	}
}


/**********************************************************
*	REACTIVE HANDLERS
***********************************************************/
var rh = {
	checked : function(lvalue,rvalue,defaultVal){
		if(lvalue==undefined && defaultVal){ lvalue = defaultVal; }
		if( lvalue==rvalue ) {
	       return ' checked="checked"'  } else { return "" };
	},
	timeConverter : function(value){
		return utils.timeConverter(value);
	},
	correctCase : function(str){
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	},
	roundDist : function(value){
		return value.toFixed(2);
	}
}




