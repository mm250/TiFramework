var _ = require("alloy/underscore");

var Declare = require("morcode/base/Declare");

var BaseClass = Declare({
    constructor: function(options) {
        var baseClass = this;
        try {
            baseClass.preCreate(arguments);
            options && baseClass.setParams(options);
            baseClass.postCreate(arguments);
        } catch (ex) {
            console.error([ "BaseClass: Error creating class: ", ex ].join(""));
        }
    },
    setParams: function(options) {
        var baseClass = this;
        _.extend(baseClass, options);
    },
    preCreate: function() {},
    postCreate: function() {}
});

module.exports = BaseClass;