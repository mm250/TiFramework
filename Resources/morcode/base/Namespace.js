var Alloy = require("alloy");

module.exports = function(context, namespace) {
    var parts = namespace.split(".");
    "Alloy" === parts[0] && (context = {
        Alloy: Alloy
    });
    for (var i = 0; parts.length > i; i++) {
        if (!context[parts[i]]) {
            var error = [ "Error the namescape doesn't exist: ", namespace, "\n" ].join("");
            console.error(error);
            throw error;
        }
        context = context[parts[i]];
    }
    return context;
};