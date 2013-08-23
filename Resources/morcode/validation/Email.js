var Declare = require("tui/base/Declare");

var IValidator = require("tui/validation/IValidator");

var emailRegex = "^[a-zA-Z0-9]+(?:[-\\._+]?[a-zA-Z0-9]+)*@(?:[a-zA-Z0-9]+(?:-?[a-zA-Z0-9]+)*\\.)+[a-zA-Z]+$";

var result = new RegExp(emailRegex);

var Email = Declare({
    "extends": IValidator,
    validate: function(value) {
        if (_.isNull(value)) return false;
        return _.isString(value) ? result.test(value) : false;
    }
});

module.exports = Email;