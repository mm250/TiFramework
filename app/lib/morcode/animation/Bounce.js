// ----------------------------------------------- imports

var _ = require("alloy/underscore");
var Declare = require('tui/base/Declare');
var AnimateBase = require("tui/animation/AnimateBase"); 
var animate = require("tui/animation/Animate"); 

// ----------------------------------------------- class

var Bounce = Declare({
	
	extends : AnimateBase,
		
	animate : function(options){
		var bounce = this;
		bounce._super(options);
		animate.bounceIn({
			node: bounce.node,
			properties: {
				duration: bounce.duration
			},
			onComplete: bounce.onComplete
		}).play();
	}
})

module.exports = Bounce;