var Alloy = require('alloy');
module.exports = function(context, namespace){
	// Summary: namespace
	//		retrieves a namespace object from given string.
	var parts = namespace.split('.');
	if (parts[0] === "Alloy") context = {"Alloy" : Alloy};
	for (var i = 0; i < parts.length; i++) {
    	if (!context[parts[i]]) {
        	var error = ["Error the namescape doesn't exist: ", namespace , "\n"].join("");
            console.error(error);
            throw error;
        }
        context = context[parts[i]];
	}
	return context;
};
