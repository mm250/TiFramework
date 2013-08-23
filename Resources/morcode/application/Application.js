var Declare = require("morcode/base/Declare");

var _ = require("alloy/underscore");

var pipeline = require("when/pipeline");

var Application = Declare({
    collectionsFactory: null,
    collection: null,
    api: null,
    startuptasks: [],
    constructor: function() {
        var application = this;
        application.bindEvents();
    },
    afterPlugAutoSet: function() {
        var application = this;
        application.collection = application.collectionsFactory(application.collection);
        application.applicationStartUp();
    },
    bindEvents: function() {
        var application = this;
        Alloy.Globals.Events.on("Application.onError", application.onError);
    },
    onError: function(ex) {
        alert(ex);
    },
    applicationStartUp: function() {
        var application = this;
        pipeline(application.startuptasks, application).then(function() {
            application.startApp();
        }, function(ex) {
            Alloy.Globals.Events.trigger("Application.onError", [ ex ]);
        });
    },
    startApp: function() {
        var application = this;
        application.$.app.open();
    }
});

module.exports = Application;