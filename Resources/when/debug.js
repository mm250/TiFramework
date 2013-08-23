(function(define) {
    define([ "./when" ], function(when) {
        function whenDebug(promise, cb, eb, pb) {
            var args = [ promise ].concat(wrapCallbacks(promise, [ cb, eb, pb ]));
            return debugPromise(when.apply(null, args), when.resolve(promise));
        }
        function debugPromise(p, parent) {
            var id, origThen, newPromise, logReject;
            if (own.call(p, "parent")) return p;
            promiseId++;
            id = parent && "id" in parent ? parent.id + "." + promiseId : promiseId;
            origThen = p.then;
            newPromise = beget(p);
            newPromise.id = id;
            newPromise.parent = parent;
            newPromise.toString = function() {
                return toString("Promise", id);
            };
            newPromise.then = function(cb, eb, pb) {
                checkCallbacks(cb, eb, pb);
                if ("function" == typeof eb) {
                    var promise = newPromise;
                    do promise.handled = true; while ((promise = promise.parent) && !promise.handled);
                }
                return debugPromise(origThen.apply(p, wrapCallbacks(newPromise, arguments)), newPromise);
            };
            logReject = function() {
                console.error(newPromise.toString());
            };
            p.then(function(val) {
                newPromise.toString = function() {
                    return toString("Promise", id, "resolved", val);
                };
                return val;
            }, wrapCallback(newPromise, function(err) {
                newPromise.toString = function() {
                    return toString("Promise", id, "REJECTED", err);
                };
                callGlobalHandler("reject", newPromise, err);
                newPromise.handled || logReject();
                throw err;
            }));
            return newPromise;
        }
        function deferDebug() {
            function promiseNotify(update) {
                callGlobalHandler("progress", d, update);
                return origNotify(update);
            }
            var d, status, value, origResolve, origReject, origNotify, origThen, id;
            d = when.defer();
            status = "pending";
            value = pending;
            id = arguments[arguments.length - 1];
            id === undef && (id = ++promiseId);
            origThen = d.promise.then;
            d.id = id;
            d.promise = debugPromise(d.promise, d);
            d.resolver = beget(d.resolver);
            d.resolver.toString = function() {
                return toString("Resolver", id, status, value);
            };
            origNotify = d.resolver.notify;
            d.notify = d.resolver.notify = promiseNotify;
            d.progress = deprecated("deferred.progress", "deferred.notify", promiseNotify, d);
            d.resolver.progress = deprecated("deferred.resolver.progress", "deferred.resolver.notify", promiseNotify, d.resolver);
            origResolve = d.resolver.resolve;
            d.resolve = d.resolver.resolve = function(val) {
                value = val;
                status = "resolving";
                callGlobalHandler("resolve", d, val);
                return origResolve.apply(undef, arguments);
            };
            origReject = d.resolver.reject;
            d.reject = d.resolver.reject = function(err) {
                value = err;
                status = "REJECTING";
                return origReject.apply(undef, arguments);
            };
            d.toString = function() {
                return toString("Deferred", id, status, value);
            };
            origThen(function(v) {
                status = "resolved";
                return v;
            }, function(e) {
                status = "REJECTED";
                return when.reject(e);
            });
            d.then = deprecated("deferred.then", "deferred.promise.then", d.promise.then, d);
            d.resolver.id = id;
            return d;
        }
        function makeDebug(name, func) {
            whenDebug[name] = function() {
                return debugPromise(func.apply(when, arguments));
            };
        }
        function wrapCallback(promise, cb) {
            return function(v) {
                try {
                    return cb(v);
                } catch (err) {
                    if (err) {
                        var toRethrow = whenDebug.debug && whenDebug.debug.exceptionsToRethrow || exceptionsToRethrow;
                        err.name in toRethrow && throwUncatchable(err);
                        callGlobalHandler("reject", promise, err);
                    }
                    throw err;
                }
            };
        }
        function wrapCallbacks(promise, callbacks) {
            var cb, args, len, i;
            args = [];
            for (i = 0, len = callbacks.length; len > i; i++) args[i] = "function" == typeof (cb = callbacks[i]) ? wrapCallback(promise, cb) : cb;
            return args;
        }
        function callGlobalHandler(handler, promise, triggeringValue, auxValue) {
            var globalHandlers = whenDebug.debug;
            if (!(globalHandlers && "function" == typeof globalHandlers[handler])) return;
            if (4 > arguments.length && "reject" == handler) try {
                throw new Error(promise.toString());
            } catch (e) {
                auxValue = e;
            }
            try {
                globalHandlers[handler](promise, triggeringValue, auxValue);
            } catch (handlerError) {
                throwUncatchable(new Error("when.js global debug handler threw: " + String(handlerError)));
            }
        }
        function toString(name, id, status, value) {
            var s = "[object " + name + " " + id + "]";
            if (arguments.length > 2) {
                s += " " + status;
                value !== pending && (s += ": " + value);
            }
            return s;
        }
        function throwUncatchable(err) {
            setTimeout(function() {
                throw err;
            }, 0);
        }
        function deprecated(name, preferred, f, context) {
            return function() {
                warn(new Error(name + " is deprecated, use " + preferred).stack);
                return f.apply(context, arguments);
            };
        }
        function checkCallbacks() {
            var i, len, a;
            for (i = 0, len = arguments.length; len > i; i++) {
                a = arguments[i];
                checkFunction(a) || warn(new Error("arg " + i + " must be a function, null, or undefined, but was a " + typeof a).stack);
            }
        }
        function checkFunction(f) {
            return "function" == typeof f || null == f;
        }
        function F() {}
        function beget(o) {
            F.prototype = o;
            o = new F();
            F.prototype = undef;
            return o;
        }
        var promiseId, pending, exceptionsToRethrow, own, warn, undef;
        promiseId = 0;
        pending = {};
        own = Object.prototype.hasOwnProperty;
        warn = "undefined" != typeof console && "function" == typeof console.warn ? function(x) {
            console.warn(x);
        } : function() {};
        exceptionsToRethrow = {
            RangeError: 1,
            ReferenceError: 1,
            SyntaxError: 1,
            TypeError: 1
        };
        whenDebug.defer = deferDebug;
        whenDebug.isPromise = when.isPromise;
        whenDebug.chain = deprecated("when.chain(p, resolver)", "resolver.resolve(p) or resolver.resolve(p.yield(optionalValue))", when.chain, when);
        for (var p in when) !when.hasOwnProperty(p) || p in whenDebug || makeDebug(p, when[p]);
        return whenDebug;
    });
})("function" == typeof define ? define : function(deps, factory) {
    "undefined" != typeof exports ? module.exports = factory(require("./when")) : this.when = factory(this.when);
});