var Declare = require("tui/base/Declare");

var IValidator = require("tui/validation/IValidator");

var Require = Declare({
    "extends": IValidator,
    validate: function(value) {
        if (_.isNull(value)) return false;
        return _.isString(value) ? "" !== string.trim(value) : false;
    }
});

module.exports = Require;