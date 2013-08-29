var Declare = require("morcode/base/Declare");

var _ = require("alloy/underscore");

var ScreenFactory = Declare({
    getScreen: function(screen) {
        Alloy.createController(screen);
    }
});