function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.app = Ti.UI.createWindow({
        id: "app"
    });
    $.__views.app && $.addTopLevelView($.__views.app);
    exports.destroy = function() {};
    _.extend($, $.__views);
    try {
        Alloy.Globals.resolve("Application", {
            $: $
        });
    } catch (ex) {
        console.log(ex);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;