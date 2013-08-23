function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.refresh = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "refresh",
        backgroundColor: "white",
        id: "refresh"
    });
    $.__views.refresh && $.addTopLevelView($.__views.refresh);
    $.__views.__alloyId26 = Ti.UI.createView({
        backgroundColor: "white",
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId26"
    });
    $.__views.__alloyId26 && $.addTopLevelView($.__views.__alloyId26);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var parser = require("morcode/alloyParser/Parser");
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var j = JSON.parse(this.responseText);
            parser.parse(j, $.getView());
        },
        onerror: function() {},
        timeout: 14e3
    });
    client.open("GET", "http://localhost:3000");
    client.send();
    $.refresh.addEventListener("singletap", function() {
        $.getView().removeAllChildren();
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                var j = JSON.parse(this.responseText);
                parser.parse(j, $.getView());
            },
            onerror: function() {},
            timeout: 14e3
        });
        client.open("GET", "http://localhost:3000");
        client.send();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;