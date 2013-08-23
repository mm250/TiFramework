var Declare = require("morcode/base/Declare");

var _ = require("alloy/underscore");

var IScreenFactory = Declare({
    getScreen: function(screen) {
        Alloy.createController(screen);
    }
});