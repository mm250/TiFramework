// ----------------------------------------------- imports
var _ = require("alloy/underscore");
var Declare = require('tui/base/Declare');
var IValidator = require('tui/validation/IValidator');
var IValidate = require('tui/validation/IValidate');

// ----------------------------------------------- class

var Validate = Declare({
	
	extends : IValidate,
	
	errorMap : null,
	
	fields : null,
	
	constructor : function(){
		var validate = this;
		validate.errorMap = {};
		validate.fields = {};
	},
	
	check : function(value, id, options) {
		var validate = this;
		
		var validatorMap = {
			fields: {}
		};
		
		(id) ? validatorMap.fields[id] = validate.fields[id] : validatorMap.fields = validate.fields;
		
		validate.errorMap = {};
	
		_.each(validatorMap.fields, function(props, fieldName) {
			_.each(props, function(validator) {
				if (validator instanceof IValidator && ! validator.validate(value, options)){
					validate.errorMap[fieldName] = validate.errorMap[fieldName] || [];
					validate.errorMap[fieldName].push(validator.validatorName);
				}
			})
		});
		
		return {
			isSuccessful : function(){
				return _.isEmpty(validate.errorMap);
			},
			
			getInvalid : function(){
				return _.isEmpty(validate.errorMap) ? null : validate.errorMap;
			}
		}
	}
})

module.exports = Validate;