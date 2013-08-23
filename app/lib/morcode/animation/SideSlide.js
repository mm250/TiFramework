// ----------------------------------------------- imports

var Declare = require('tui/base/Declare');
var SlideTo = require("tui/animation/SlideTo"); 

// ----------------------------------------------- class

var SideSlide = Declare({
	
	extends : SlideTo,
	  
	to : 0,
	
	animate : function(options){
		var sideSlide = this;
		sideSlide.to = (sideSlide.node.left > 0) ? 0 : Ti.Platform.displayCaps.platformWidth - measurement.dpToPX(54);
		options.autoreverse = false;
		sideSlide._super(options);
	}
})

module.exports = SideSlide;