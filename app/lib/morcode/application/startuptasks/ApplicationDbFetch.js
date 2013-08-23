module.exports = function(application){
	// sync collection with local database.
	application.collection.fetch();
}; 