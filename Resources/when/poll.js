(function(define) {
    "use strict";
    define([ "./when", "./cancelable", "./delay", "./function" ], function(when, cancelable, delay, fn) {
        function F() {}
        function beget(p) {
            F.prototype = p;
            var newPromise = new F();
            F.prototype = null;
            return newPromise;
        }
        var undef;
        return function(work, interval, verifier, delayInitialWork) {
            function certify(result) {
                deferred.resolve(result);
            }
            function schedule(result) {
                fn.apply(interval).then(vote, reject);
                result !== undef && deferred.notify(result);
            }
            function vote() {
                if (canceled) return;
                when(work(), function(result) {
                    when(verifier(result), function(verification) {
                        return verification ? certify(result) : schedule(result);
                    }, function() {
                        schedule(result);
                    });
                }, reject);
            }
            var deferred, canceled, reject;
            canceled = false;
            deferred = cancelable(when.defer(), function() {
                canceled = true;
            });
            reject = deferred.reject;
            verifier = verifier || function() {
                return false;
            };
            "function" != typeof interval && (interval = function(interval) {
                return function() {
                    return delay(interval);
                };
            }(interval));
            delayInitialWork ? schedule() : vote();
            deferred.promise = beget(deferred.promise);
            deferred.promise.cancel = deferred.cancel;
            return deferred.promise;
        };
    });
})("function" == typeof define && define.amd ? define : function(deps, factory) {
    "object" == typeof exports ? module.exports = factory(require("./when"), require("./cancelable"), require("./delay"), require("./function")) : this.when_poll = factory(this.when, this.when_cancelable, this.when_delay, this.when_function);
});