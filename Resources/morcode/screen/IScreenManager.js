var Declare = require("morcode/base/Declare");

var _ = require("alloy/underscore");

var _clone = require("morcode/base/Clone");

var BaseScreenManager = Declare({
    modules: null,
    currentModule: null,
    screens: null,
    currentScreen: null,
    constructor: function() {
        var baseScreenManager = this;
        baseScreenManager.modules = [];
        baseScreenManager.screens = [];
    },
    afterPlugAutoSet: function() {
        var baseScreenManager = this;
        null !== baseScreenManager.currentScreen ? baseScreenManager.loadScreen() : null !== baseScreenManager.currentModule && baseScreenManager.loadModule();
    },
    loadModule: function() {
        var baseScreenManager = this;
        Alloy.Globals.resolve(baseScreenManager.modules[baseScreenManager.currentModule], {
            $: baseScreenManager.$
        });
    },
    loadScreen: function() {
        var baseScreenManager = this;
        var screenName = baseScreenManager.screens[baseScreenManager.currentScreen];
        Alloy.Globals.resolve(screenName, {
            $: controller.$
        });
    },
    pushScreen: function() {
        var baseScreenManager = this;
        baseScreenManager.currentScreens++;
        baseScreenManager.loadScreen();
    }
});

module.exports = BaseScreenManager;