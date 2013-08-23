(function(define) {
    define([ "./when" ], function(when) {
        var undef;
        return function(promise, msec) {
            if (2 > arguments.length) {
                msec = promise >>> 0;
                promise = undef;
            }
            var deferred = when.defer();
            setTimeout(function() {
                deferred.resolve(promise);
            }, msec);
            return deferred.promise;
        };
    });
})("function" == typeof define ? define : function(deps, factory) {
    "undefined" != typeof module ? module.exports = factory(require("./when")) : this.when_delay = factory(this.when);
});