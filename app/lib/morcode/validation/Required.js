// ----------------------------------------------- imports

var Declare = require('tui/base/Declare');
var IValidator = require('tui/validation/IValidator');

// ----------------------------------------------- class

var Require = Declare({
	
	extends : IValidator,
	
	validate : function(value, options){
	
        if(_.isNull(value)) return false;

        return _.isString(value) ? string.trim(value) !== "" : false;
       
	}
	
})

module.exports = Require;