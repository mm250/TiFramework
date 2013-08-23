function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.app = Ti.UI.createWindow({
        width: Alloy.Globals.deviceSize.w,
        height: Alloy.Globals.deviceSize.h,
        layout: "absolute",
        id: "app"
    });
    $.__views.app && $.addTopLevelView($.__views.app);
    $.__views.__alloyId0 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId0"
    });
    $.__views.app.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createView({
        backgroundColor: "red",
        layout: "vertical",
        width: Ti.UI.FILL,
        height: "100",
        id: "__alloyId1"
    });
    $.__views.__alloyId0.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createScrollView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        accessibilityLabel: "page-scroller",
        showVerticalScrollIndicator: "true",
        scrollType: "vertical",
        layout: "vertical",
        id: "__alloyId2"
    });
    $.__views.__alloyId0.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "100",
        color: "#000",
        text: "content2",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId3"
    });
    $.__views.__alloyId2.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "100",
        color: "#000",
        text: "content2",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId4"
    });
    $.__views.__alloyId2.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "100",
        color: "#000",
        text: "content2",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId5"
    });
    $.__views.__alloyId2.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "100",
        color: "#000",
        text: "content2",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId6"
    });
    $.__views.__alloyId2.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "100",
        color: "#000",
        text: "content2",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId7"
    });
    $.__views.__alloyId2.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "100",
        color: "#000",
        text: "content2",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId8"
    });
    $.__views.__alloyId2.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "100",
        color: "#000",
        text: "content2",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId9"
    });
    $.__views.__alloyId2.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "100",
        color: "#000",
        text: "content2",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId10"
    });
    $.__views.__alloyId2.add($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "100",
        color: "#000",
        text: "content2",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId11"
    });
    $.__views.__alloyId2.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "100",
        color: "#000",
        text: "content2",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId12"
    });
    $.__views.__alloyId2.add($.__views.__alloyId12);
    $.__views.__alloyId13 = Ti.UI.createView({
        top: "0",
        left: "100",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId13"
    });
    $.__views.app.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createView({
        backgroundColor: "red",
        layout: "vertical",
        width: Ti.UI.FILL,
        height: "100",
        id: "__alloyId14"
    });
    $.__views.__alloyId13.add($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "Welcomed",
        accessibilityLabel: "login title",
        backgroundColor: "red",
        id: "__alloyId15"
    });
    $.__views.__alloyId14.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "Welcjjomcccedjdjdj",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId16"
    });
    $.__views.__alloyId14.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createScrollView({
        accessibilityLabel: "page-scroller",
        showVerticalScrollIndicator: "true",
        scrollType: "vertical",
        id: "__alloyId17"
    });
    $.__views.__alloyId13.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createView({
        backgroundColor: "blue",
        layout: "vertical",
        top: "0",
        left: "0",
        width: Ti.UI.FILL,
        height: "0",
        id: "__alloyId18"
    });
    $.__views.__alloyId17.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: "100",
        color: "#000",
        text: "content2",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId19"
    });
    $.__views.__alloyId18.add($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: "100",
        color: "#000",
        text: "content1",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId20"
    });
    $.__views.__alloyId18.add($.__views.__alloyId20);
    $.__views.__alloyId21 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: "100",
        color: "#000",
        text: "content1",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId21"
    });
    $.__views.__alloyId18.add($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: "100",
        color: "#000",
        text: "content1",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId22"
    });
    $.__views.__alloyId18.add($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: "100",
        color: "#000",
        text: "content1",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId23"
    });
    $.__views.__alloyId18.add($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createView({
        backgroundColor: "yellow",
        layout: "vertical",
        top: "0",
        left: "0",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId24"
    });
    $.__views.__alloyId17.add($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: "100",
        color: "#000",
        text: "content2",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId25"
    });
    $.__views.__alloyId24.add($.__views.__alloyId25);
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