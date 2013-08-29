module.exports = {
	
	ApiClient:{
		
		plugType: "morcode/application/ApiClient",
		
		plugScope: "singleton"
	},
	
	AppSettings:{
		
		plugType: "morcode/application/AppSettings",
		
		apiVersion: "v1",
		
		plugScope: "singleton"
	},
	
	Application: {
		
		plugType: "morcode/application/Application",
		
		appSettings: "$AppSettings",
		
		collection: "App",
		
		api: "application/settings",
		
		apiName: "settings",
		
		startuptasks: [{
			plugType: "morcode/application/startuptasks/ApplicationDbFetch",
			plugScope: "object"	
		},{
			plugType: "morcode/application/startuptasks/ApplicationApiFetch",
			plugScope: "object"	
		}],
		
		screenManager: {
			plugType: "morcode/screen/ScreenManager",
			appTemplateName: "HamburgerTmpl",
			plugScope: "singleton",
			screenFactory: "{Alloy.createController}"
		},
		
		collectionsFactory: "{Alloy.Collections.instance}",
		
		plugScope: "singleton"	
	},
	
	HamburgerTmpl:{
		
		plugType: "morcode/appTemplate/BaseTmpl",
		
		plugScope: "singleton"
	},
	
	
	
	
	
	
	
	
	AppScreenManager : {
		// class
		plugType : "morcode/screen/IScreenManager",			
		// scope	
		plugScope : "singleton",	
		// configure module.
		modules : ["SplashModule", "Login", "Homepage"],
		
		currentModule : 0	
	},
	
	// --------------------------------------------------- modules
	
	SplashModule : {
		// class
		plugType : "morcode/screen/IScreenManager",
		// scope
		plugScope : "singleton",
		// configure module.
		screens : ["Splash"],
		
		currentScreen : 0		
	},
	
	// --------------------------------------------------- screens
	
	Home : {
		// class
		plugType: "morcode/screens/ScreenBase",
		// screen template
		screenTmpl: "/home",
		// scope
		plugScope: "singleton"
	}
	
};