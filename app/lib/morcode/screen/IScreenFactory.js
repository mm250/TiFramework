// ------------------------------------------ imports

var Declare = require('morcode/base/Declare');
var _ = require("alloy/underscore");

// ------------------------------------------ class

var IScreenFactory = Declare({
	
	getScreen: function(screen){
		var iScreenFactory = this;
		Alloy.createController(screen); 
	}
})