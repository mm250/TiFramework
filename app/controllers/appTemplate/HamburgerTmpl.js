var underscore = require("alloy/underscore");
var machina = require('machina/Machina')(underscore);

$.appStates = new machina.Fsm({

	initialState : "home_state",
	
	initialize : function(){
		
		var appStates = this;
		Alloy.Globals.addEventListener("singletap", $.hamburgerTmpl, "action", function(tuiCompoment){
			appStates.handle(tuiCompoment.action);
		});
		
		appStates.attachListeners();
	},
	
	attachListeners : function(){
		
		/*$.hamburgerTmpl.addEventListener("menu", function(){
			console.log("menu");
		});
		
		$.hamburgerTmpl.addEventListener("home", function(){
			console.log("home");
		});*/ 
	},

	states : {
		
		"home_state" : {
		    "menu" : function() {
		    	var appStates = this;
             	$.hamburgerTmpl.fireEvent("menu");
             	alert("menu");
             	appStates.transition("menu_state");
            }
		},

		"menu_state" : {
			"menu" : function() {
				var appStates = this;
              	$.hamburgerTmpl.fireEvent("home");
              	alert("home");
              	appStates.transition("home_state");
            }
		}
	}
}); 

