var parser = require('morcode/alloyParser/Parser');


//$.getView().add(view)
//$.getView().backgroundColor = "red"
var client = Ti.Network.createHTTPClient( {
				// function called when the response data is available
				onload : function(data){
		
					var j = JSON.parse(this.responseText);
					
					parser.parse(j, $.getView())
				},
				// function called when an error occurs, including a timeout
				onerror : function(){
					
				},
				timeout : 14000  
			});
			

client.open("GET", "http://localhost:3000");
client.send();

$.refresh.addEventListener("singletap", function(){
	$.getView().removeAllChildren();
	var client = Ti.Network.createHTTPClient( {
				// function called when the response data is available
				onload : function(data){
		
					var j = JSON.parse(this.responseText);
					
					parser.parse(j, $.getView())
				},
				// function called when an error occurs, including a timeout
				onerror : function(){
					
				},
				timeout : 14000  
			});
			client.open("GET", "http://localhost:3000");
client.send();
})
