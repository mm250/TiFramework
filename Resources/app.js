var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.apm = void 0;

try {
    Alloy.Globals.apm = require("com.appcelerator.apm");
} catch (e) {
    Ti.API.info("com.appcelerator.apm module is not available");
}

Alloy.Globals.apm && Alloy.Globals.apm.init();

Alloy.Globals.resolve = require("morcode/ioc/Plug").resolve;

Alloy.Globals.deviceSize = {
    w: Ti.Platform.displayCaps.platformWidth,
    h: Ti.Platform.displayCaps.platformHeight
};

Alloy.Globals.Events = _.clone(Backbone.Events);

Alloy.createController("index");