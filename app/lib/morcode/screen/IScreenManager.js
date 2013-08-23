// ------------------------------------------ imports.

var Declare = require('morcode/base/Declare');
//var stateMachine = require('morcode/statemachine/StateMachine');
//var IScreenFactory = require('morcode/screen/IScreenFactory');
var _ = require("alloy/underscore");
var _clone = require("morcode/base/Clone");

// ------------------------------------------ class.

var BaseScreenManager = Declare({
	
	
	modules: null,
	
	currentModule: null,
		
	screens: null,
	
	currentScreen: null,

	constructor: function(){
		var baseScreenManager = this;
		baseScreenManager.modules = [];
		baseScreenManager.screens = [];
	},
	
	afterPlugAutoSet: function(){
		// Method: afterPlugAutoSet.
		//		This method is called after the IOC sets class members specified from
		//		config. 
		var baseScreenManager = this;

		if (baseScreenManager.currentScreen !== null){
			baseScreenManager.loadScreen();
		} else if (baseScreenManager.currentModule !== null){
			baseScreenManager.loadModule();
		}
		/*var fsmConfig = {
			
  			events: baseScreenManager.getEvents(),
  			
  			// error
  			error: function(eventName, from, to, args, errorCode, errorMessage) {},
  			
  			// callbacks to events
  			callbacks: {
  				onenterstate:function(event, oldState, newState){
  					if (_.contains(baseScreenManager.screens, newState)){
  						baseScreenManager.loadScreen(newState);
  					}
  				} 
  			}
    	}
    	
		baseScreenManager.fsm = stateMachine.create(fsmConfig);*/
		
		/*if (!_.isEmpty(baseScreenManager.screens)){
			baseScreenManager.fsm.pushScreen();
		}*/
	},
	
	/*getEvents: function(){
		var baseScreenManager = this;
		var events = [];
		
		//if (!_.isEmpty(baseScreenManager.modules)) {
			//events.push({name: "pushModule", from: "none", to: baseScreenManager.modules[0]});
			//baseScreenManager.createEvents('pushModule', baseScreenManager.modules, events);
			//baseScreenManager.createEvents('popModule', _clone(baseScreenManager.modules).reverse(), events);
		//}
		
		if (!_.isEmpty(baseScreenManager.screens)) {
			events.push({name: "pushScreen", from: "none", to: baseScreenManager.screens[0]});
			baseScreenManager.createEvents('pushScreen', baseScreenManager.screens, events);
			baseScreenManager.createEvents('popScreen', _clone(baseScreenManager.screens).reverse(), events);
		}
	
		return events;
	},*/
	
	/*createEvents: function(eventName, collection, events){
		var baseScreenManager = this;
		
		_.each(collection, function(item, i){
			if (i !== collection.length){
				events.push({name: eventName, from: item, to: collection[i + 1]});
			}
		});
			
			//var reserve = _clone(collection).reverse();
			//_.each(_clone(collection).reverse(), function(item, i){
				//if (i < collection.length + 1){
					//events.push({name: 'popModule', from: item, to: reserve[i + 1]});
				//}
			//});
	},*/
	
	loadModule: function(){
		var baseScreenManager = this;
		Alloy.Globals.resolve(baseScreenManager.modules[baseScreenManager.currentModule], {$: baseScreenManager.$});
	},
	
	loadScreen: function(){
		var baseScreenManager = this;
		var screenName = baseScreenManager.screens[baseScreenManager.currentScreen];
		Alloy.Globals.resolve(screenName, {$: controller.$});
	},
		
	pushScreen: function() {
		var baseScreenManager = this;
		baseScreenManager.currentScreens++;
		baseScreenManager.loadScreen();
	}
})

module.exports = BaseScreenManager;

