(function(define) {
    define([ "./when" ], function(when) {
        var undef;
        return function(promise, msec) {
            function cancelTimeout() {
                clearTimeout(timeoutRef);
                timeoutRef = undef;
            }
            var deferred, timeoutRef;
            deferred = when.defer();
            timeoutRef = setTimeout(function() {
                timeoutRef && deferred.reject(new Error("timed out"));
            }, msec);
            when(promise, function(value) {
                cancelTimeout();
                deferred.resolve(value);
            }, function(reason) {
                cancelTimeout();
                deferred.reject(reason);
            });
            return deferred.promise;
        };
    });
})("function" == typeof define ? define : function(deps, factory) {
    "undefined" != typeof module ? module.exports = factory(require("./when")) : this.when_timeout = factory(this.when);
});