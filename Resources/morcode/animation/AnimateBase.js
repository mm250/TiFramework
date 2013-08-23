var _ = require("alloy/underscore");

var Declare = require("tui/base/Declare");

var BaseClass = require("tui/base/BaseClass");

var AnimateBase = Declare({
    "extends": BaseClass,
    node: null,
    onComplete: null,
    duration: 350,
    constructor: function(options) {
        var animateBase = this;
        animateBase._super(options);
    },
    animate: function(options) {
        var animateBase = this;
        options && animateBase.setParams(options);
    }
});

module.exports = AnimateBase;