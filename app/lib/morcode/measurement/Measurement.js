var Alloy = require('alloy');
var alloyMeasurement = require('alloy/measurement');
module.exports = {

	widthFactor : null,

	getWidthFactor : function(value){
		var measurement = this;
		return value * (measurement.widthFactor || (function() {
			measurement.widthFactor = (Alloy.CFG.widthFactor === -1) ? 1 : Alloy.Globals.Styles.device.width / Alloy.CFG.widthFactor;
			return measurement.widthFactor;
		})());
	},
	//duplicate the system function measurement.doToPX()
	dpToPX : function(value){
	    return alloyMeasurement.dpToPX(value);
	}
}

