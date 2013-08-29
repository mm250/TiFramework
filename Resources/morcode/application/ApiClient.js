var Alloy = require("alloy");

var Declare = require("morcode/base/Declare");

var _ = require("alloy/underscore");

var when = require("when/when");

var ApiClient = Declare({
    endpoint: Alloy.CFG.endPoint,
    timeout: 14e3,
    read: function(api, collection, ref, severity, onload, onerror) {
        var apiClient = this;
        severity = severity || true;
        apiClient.request(api, "GET", null, function() {
            var HTTPClient = this;
            var response = HTTPClient.responseText;
            response && (JSONResponse = JSON.parse(response));
            onload && onload(JSONResponse);
        }, function(ex) {
            onerror ? onerror() : Alloy.Globals.Events.trigger("Application.onError", [ ex, severity ]);
        });
    },
    request: function(api, method, params, onload, onerror) {
        var apiClient = this;
        var requestAPI = [ apiClient.endpoint + "/" + api ];
        var body = params;
        if (!api || 0 === api.length) throw "No api location has been specified";
        method = method || "GET";
        var HTTPClient = Ti.Network.createHTTPClient({
            onload: onload || apiClient.onload,
            onerror: onerror || apiClient.onError,
            timeout: apiClient.timeout
        });
        if (params && "GET" === method) {
            requestAPI.push("?" + params);
            body = void 0;
        }
        HTTPClient.open(method, requestAPI.join("/"));
        HTTPClient.send(body);
    }
});

module.exports = ApiClient;