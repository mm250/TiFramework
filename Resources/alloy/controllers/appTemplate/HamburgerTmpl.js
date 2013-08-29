function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.hamburgerTmpl = Ti.UI.createView({
        id: "hamburgerTmpl"
    });
    $.__views.hamburgerTmpl && $.addTopLevelView($.__views.hamburgerTmpl);
    $.__views.__alloyId1 = Ti.UI.createView({
        width: Alloy.Globals.deviceSize.w,
        height: Alloy.Globals.deviceSize.h,
        layout: "vertical",
        top: 0,
        id: "__alloyId1"
    });
    $.__views.hamburgerTmpl.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createView({
        width: Alloy.Globals.deviceSize.w,
        height: 50,
        backgroundColor: "#ccc",
        id: "__alloyId2"
    });
    $.__views.__alloyId1.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createScrollView({
        width: Alloy.Globals.deviceSize.w,
        height: Alloy.Globals.deviceSize.h,
        showVerticalScrollIndicator: "true",
        scrollType: "vertical",
        layout: "vertical",
        id: "__alloyId3"
    });
    $.__views.__alloyId1.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "100",
        color: "#000",
        text: "content2",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId4"
    });
    $.__views.__alloyId3.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "100",
        color: "#000",
        text: "content2",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId5"
    });
    $.__views.__alloyId3.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "100",
        color: "#000",
        text: "content2",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId6"
    });
    $.__views.__alloyId3.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "100",
        color: "#000",
        text: "content2",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId7"
    });
    $.__views.__alloyId3.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "100",
        color: "#000",
        text: "content2",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId8"
    });
    $.__views.__alloyId3.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "100",
        color: "#000",
        text: "content2",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId9"
    });
    $.__views.__alloyId3.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "100",
        color: "#000",
        text: "content2",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId10"
    });
    $.__views.__alloyId3.add($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "100",
        color: "#000",
        text: "content2",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId11"
    });
    $.__views.__alloyId3.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "100",
        color: "#000",
        text: "content2",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId12"
    });
    $.__views.__alloyId3.add($.__views.__alloyId12);
    $.__views.__alloyId13 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "100",
        color: "#000",
        text: "content2",
        accessibilityLabel: "login title",
        backgroundColor: "green",
        id: "__alloyId13"
    });
    $.__views.__alloyId3.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createView({
        width: Alloy.Globals.deviceSize.w,
        height: Alloy.Globals.deviceSize.h,
        layout: "vertical",
        top: 0,
        left: 0,
        id: "__alloyId14"
    });
    $.__views.hamburgerTmpl.add($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createScrollView({
        top: 0,
        width: Alloy.Globals.deviceSize.w,
        height: Alloy.Globals.deviceSize.h,
        showVerticalScrollIndicator: true,
        scrollType: "vertical",
        layout: "vertical",
        id: "__alloyId15"
    });
    $.__views.__alloyId14.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createView({
        width: Alloy.Globals.deviceSize.w,
        height: "50",
        layout: "horizontal",
        backgroundColor: "#ccc",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    $.__views.menu_button = Ti.UI.createView({
        id: "menu_button",
        action: "menu",
        width: "20",
        height: "20",
        backgroundColor: "#ffff",
        top: "15",
        left: "15",
        borderColor: "red"
    });
    $.__views.__alloyId16.add($.__views.menu_button);
    $.__views.__alloyId17 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "50",
        color: "#000",
        text: "content7",
        borderColor: "yellow",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createView({
        backgroundColor: "blue",
        layout: "vertical",
        top: "0",
        left: "0",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId18"
    });
    $.__views.__alloyId15.add($.__views.__alloyId18);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var underscore = require("alloy/underscore");
    var machina = require("machina/Machina")(underscore);
    $.appStates = new machina.Fsm({
        initialState: "home_state",
        initialize: function() {
            var appStates = this;
            Alloy.Globals.addEventListener("singletap", $.hamburgerTmpl, "action", function(tuiCompoment) {
                appStates.handle(tuiCompoment.action);
            });
            appStates.attachListeners();
        },
        attachListeners: function() {},
        states: {
            home_state: {
                menu: function() {
                    var appStates = this;
                    $.hamburgerTmpl.fireEvent("menu");
                    alert("menu");
                    appStates.transition("menu_state");
                }
            },
            menu_state: {
                menu: function() {
                    var appStates = this;
                    $.hamburgerTmpl.fireEvent("home");
                    alert("home");
                    appStates.transition("home_state");
                }
            }
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;