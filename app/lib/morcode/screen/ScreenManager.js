// ------------------------------------------ imports.

var Declare = require('morcode/base/Declare');
var _ = require("alloy/underscore");
var Alloy = require("alloy");

// ------------------------------------------ class.

var ScreenManager = Declare({
	
	$: null,
	
	appTemplateName: null,
	
	appTemplate: null,
	
	screenFactory: null,
	
	afterPlugAutoSet: function(){
		var screenManager = this;
	},
	
	init: function($){
		var screenManager = this;
		screenManager.$ = $;
		screenManager.createAppTemplate();
	},
	
	createAppTemplate: function(){
		var screenManager = this;
		screenManager.createScreen("appTemplate", screenManager.appTemplateName);
		screenManager.$.app.add(screenManager.appTemplate.getView());
	},
	
	createScreen: function(root, screenName){
		var screenManager = this;
		screenManager.appTemplate = screenManager.screenFactory([root, screenName].join("/"));
		var screen = Alloy.Globals.resolve(screenName);
	}
});

module.exports = ScreenManager;

