var when = require("when");

module.exports = function(application) {
    application.collection.fetch();
    return when.resolve(application);
};