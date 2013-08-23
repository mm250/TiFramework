var Declare = require("tui/base/Declare");

var IValidator = require("tui/validation/IValidator");

var Min = Declare({
    "extends": IValidator,
    validate: function(value) {
        var minValidator = this;
        minValidator._super(value, options);
        if (_.isNull(value) || _.isNull(minValidator.options.min)) return false;
        return _.isString(value) && _.isNumber(minValidator.options.min) ? value.length <= minValidator.options.min : false;
    }
});

module.exports = Min;