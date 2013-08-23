var when = require('when/when');

module.exports = function(application){
	var deferred = when.defer();
	
	// sync application collection
	application.collection.apiFetch(application.api).then(function(response){
		deferred.resolve(response);	
	})
	
	return deferred.promise;
}; 