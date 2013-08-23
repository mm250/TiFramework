// ----------------------------------------------- imports

var Declare = require('tui/base/Declare');
var IValidator = require('tui/validation/IValidator');

// ----------------------------------------------- class

var Max = Declare({
    
    extends : IValidator,
    
    validate : function(value, options){
        var maxValidator = this;
        maxValidator._super(value, options);
 
        if(_.isNull(value) || _.isNull(maxValidator.options.max)) return false;
      
        //false means value.length passes (shorter) than options
        return _.isString(value) &&  _.isNumber(maxValidator.options.max) ? value.length <= maxValidator.options.max : false;

 
        
    }
    
});

module.exports = Max;