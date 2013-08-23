module.exports = {
    ApiClient: {
        plugType: "morcode/application/ApiClient",
        plugScope: "singleton"
    },
    AppSettings: {
        plugType: "morcode/application/AppSettings",
        apiVersion: "v1",
        plugScope: "singleton"
    },
    Application: {
        plugType: "morcode/application/Application",
        appSettings: "$AppSettings",
        collection: "App",
        api: "application/settings",
        ref: "settings",
        startuptasks: [ {
            plugType: "morcode/application/startuptasks/ApplicationApiFetch",
            plugScope: "object"
        }, {
            plugType: "morcode/application/startuptasks/ApplicationDbFetch",
            plugScope: "object"
        } ],
        collectionsFactory: "{Alloy.Collections.instance}",
        plugScope: "singleton"
    },
    AppScreenManager: {
        plugType: "morcode/screen/IScreenManager",
        plugScope: "singleton",
        modules: [ "SplashModule", "Login", "Homepage" ],
        currentModule: 0
    },
    SplashModule: {
        plugType: "morcode/screen/IScreenManager",
        plugScope: "singleton",
        screens: [ "Splash" ],
        currentScreen: 0
    },
    Home: {
        plugType: "morcode/screens/ScreenBase",
        screenTmpl: "/home",
        plugScope: "singleton"
    }
};