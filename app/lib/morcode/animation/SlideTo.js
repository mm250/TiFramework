// ----------------------------------------------- imports

var _ = require("alloy/underscore");
var Declare = require('tui/base/Declare');
var AnimateBase = require("tui/animation/AnimateBase"); 
var animate = require("tui/animation/Animate"); 

// ----------------------------------------------- class

var SlideTo = Declare({
	
	extends : AnimateBase,
	   
	to : null,
	
	duration : 350,
	
	onComplete : null, 
	
	animate : function(options){
		var slideTo = this;
		slideTo._super(options);
		if (slideTo.node) {
			animate.animateProperty({
				node : slideTo.node,
				properties : {
					left : slideTo.to,
					duration : slideTo.duration
				},
				onComplete : slideTo.onComplete
			}).play();
		}
	}
})

module.exports = SlideTo;