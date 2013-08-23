(function(define) {
    define([ "./when" ], function(when) {
        return function(deferred, canceler) {
            var delegate = when.defer();
            deferred.cancel = function() {
                return delegate.reject(canceler(deferred));
            };
            deferred.promise.then(delegate.resolve, delegate.reject, delegate.notify);
            deferred.promise = delegate.promise;
            deferred.then = delegate.promise.then;
            return deferred;
        };
    });
})("function" == typeof define ? define : function(deps, factory) {
    "undefined" != typeof module ? module.exports = factory(require("./when")) : this.when_cancelable = factory(this.when);
});