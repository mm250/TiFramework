var when = require('when');

module.exports = function(application){

	// sync collection with local database.
	application.collection.fetch();
	
	return when.resolve(application);
}; 