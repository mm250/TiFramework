// ------------------------------------------ imports

var Declare = require('morcode/base/Declare');
var _ = require("alloy/underscore");
var pipeline = require('when/pipeline');
var Alloy = require("alloy");

// ------------------------------------------ class

var Application = Declare({
	
	collectionsFactory: null,
		
	collection: null,
	
	api: null,
	
	apiName: null,
	
	startuptasks: [],
	
	screenManager: null,
	
	constructor: function(){
		var application = this;
		application.bindEvents();
	},
	
	afterPlugAutoSet: function(){
		var application = this;
		application.collection = application.collectionsFactory(application.collection);
		application.applicationStartUp();
	}, 
	
	bindEvents: function(){
		var application = this;
		Alloy.Globals.Events.on("Application.onError", application.onError);
	},
	
	onError: function(ex){
		var application = this;
		console.log(ex.error);
		alert(JSON.stringify(ex));
	},
	
	applicationStartUp: function(){
		// Method: applicationStartUp.
		//		Runs through the application start up tasks, before launching application.
		var application = this;
		
		pipeline(application.startuptasks, application).then(function() {
			try{	
				application.startApp(); 
			} catch (ex){
				console.log(ex);
				//Alloy.Globals.Events.trigger("Application.onError", [ex]);
			}
		}, function(ex){
			Alloy.Globals.Events.trigger("Application.onError", [ex]);
		});
	},
	
	startApp: function(){
		// Method: startApp.
		//		opens application window.
		var application = this;
		application.screenManager.init(application.$);
		application.$.app.open();
	}
});

module.exports = Application;