var when = require("when");

exports.definition = {
    config: {
        columns: {
            screen_cache: "text",
            home: "text"
        },
        adapter: {
            type: "sql",
            collection_name: "App"
        }
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            apiFetch: function(api, ref) {
                var app = this;
                var deferred = when.defer();
                apiClient = Alloy.Globals.resolve("ApiClient");
                apiClient.read(api, app, ref, true, function(response) {
                    deferred.resolve(response);
                });
                return deferred.promise;
            }
        });
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("App", exports.definition, []);

collection = Alloy.C("App", exports.definition, model);

exports.Model = model;

exports.Collection = collection;