(function(define) {
    "use strict";
    define(function() {
        function when(promiseOrValue, onFulfilled, onRejected, onProgress) {
            return resolve(promiseOrValue).then(onFulfilled, onRejected, onProgress);
        }
        function resolve(promiseOrValue) {
            var promise;
            promise = promiseOrValue instanceof Promise ? promiseOrValue : isPromise(promiseOrValue) ? assimilate(promiseOrValue) : fulfilled(promiseOrValue);
            return promise;
        }
        function assimilate(thenable) {
            var d = defer();
            try {
                thenable.then(function(value) {
                    d.resolve(value);
                }, function(reason) {
                    d.reject(reason);
                }, function(update) {
                    d.progress(update);
                });
            } catch (e) {
                d.reject(e);
            }
            return d.promise;
        }
        function reject(promiseOrValue) {
            return when(promiseOrValue, rejected);
        }
        function Promise(then) {
            this.then = then;
        }
        function fulfilled(value) {
            var p = new Promise(function(onFulfilled) {
                try {
                    return resolve("function" == typeof onFulfilled ? onFulfilled(value) : value);
                } catch (e) {
                    return rejected(e);
                }
            });
            return p;
        }
        function rejected(reason) {
            var p = new Promise(function(_, onRejected) {
                try {
                    return resolve("function" == typeof onRejected ? onRejected(reason) : rejected(reason));
                } catch (e) {
                    return rejected(e);
                }
            });
            return p;
        }
        function defer() {
            function then(onFulfilled, onRejected, onProgress) {
                return _then(onFulfilled, onRejected, onProgress);
            }
            function promiseResolve(val) {
                return _resolve(resolve(val));
            }
            function promiseReject(err) {
                return _resolve(rejected(err));
            }
            function promiseNotify(update) {
                return _notify(update);
            }
            var deferred, promise, handlers, progressHandlers, _then, _notify, _resolve;
            promise = new Promise(then);
            deferred = {
                then: then,
                resolve: promiseResolve,
                reject: promiseReject,
                progress: promiseNotify,
                notify: promiseNotify,
                promise: promise,
                resolver: {
                    resolve: promiseResolve,
                    reject: promiseReject,
                    progress: promiseNotify,
                    notify: promiseNotify
                }
            };
            handlers = [];
            progressHandlers = [];
            _then = function(onFulfilled, onRejected, onProgress) {
                var deferred, progressHandler;
                deferred = defer();
                progressHandler = "function" == typeof onProgress ? function(update) {
                    try {
                        deferred.notify(onProgress(update));
                    } catch (e) {
                        deferred.notify(e);
                    }
                } : function(update) {
                    deferred.notify(update);
                };
                handlers.push(function(promise) {
                    promise.then(onFulfilled, onRejected).then(deferred.resolve, deferred.reject, progressHandler);
                });
                progressHandlers.push(progressHandler);
                return deferred.promise;
            };
            _notify = function(update) {
                processQueue(progressHandlers, update);
                return update;
            };
            _resolve = function(value) {
                _then = value.then;
                _resolve = resolve;
                _notify = identity;
                processQueue(handlers, value);
                progressHandlers = handlers = undef;
                return value;
            };
            return deferred;
        }
        function isPromise(promiseOrValue) {
            return promiseOrValue && "function" == typeof promiseOrValue.then;
        }
        function some(promisesOrValues, howMany, onFulfilled, onRejected, onProgress) {
            checkCallbacks(2, arguments);
            return when(promisesOrValues, function(promisesOrValues) {
                function rejecter(reason) {
                    rejectOne(reason);
                }
                function fulfiller(val) {
                    fulfillOne(val);
                }
                var toResolve, toReject, values, reasons, deferred, fulfillOne, rejectOne, notify, len, i;
                len = promisesOrValues.length >>> 0;
                toResolve = Math.max(0, Math.min(howMany, len));
                values = [];
                toReject = len - toResolve + 1;
                reasons = [];
                deferred = defer();
                if (toResolve) {
                    notify = deferred.notify;
                    rejectOne = function(reason) {
                        reasons.push(reason);
                        if (!--toReject) {
                            fulfillOne = rejectOne = noop;
                            deferred.reject(reasons);
                        }
                    };
                    fulfillOne = function(val) {
                        values.push(val);
                        if (!--toResolve) {
                            fulfillOne = rejectOne = noop;
                            deferred.resolve(values);
                        }
                    };
                    for (i = 0; len > i; ++i) i in promisesOrValues && when(promisesOrValues[i], fulfiller, rejecter, notify);
                } else deferred.resolve(values);
                return deferred.promise.then(onFulfilled, onRejected, onProgress);
            });
        }
        function any(promisesOrValues, onFulfilled, onRejected, onProgress) {
            function unwrapSingleResult(val) {
                return onFulfilled ? onFulfilled(val[0]) : val[0];
            }
            return some(promisesOrValues, 1, unwrapSingleResult, onRejected, onProgress);
        }
        function all(promisesOrValues, onFulfilled, onRejected, onProgress) {
            checkCallbacks(1, arguments);
            return map(promisesOrValues, identity).then(onFulfilled, onRejected, onProgress);
        }
        function join() {
            return map(arguments, identity);
        }
        function map(promise, mapFunc) {
            return when(promise, function(array) {
                var results, len, toResolve, resolve, i, d;
                toResolve = len = array.length >>> 0;
                results = [];
                d = defer();
                if (toResolve) {
                    resolve = function(item, i) {
                        when(item, mapFunc).then(function(mapped) {
                            results[i] = mapped;
                            --toResolve || d.resolve(results);
                        }, d.reject);
                    };
                    for (i = 0; len > i; i++) i in array ? resolve(array[i], i) : --toResolve;
                } else d.resolve(results);
                return d.promise;
            });
        }
        function reduce(promise, reduceFunc) {
            var args = slice.call(arguments, 1);
            return when(promise, function(array) {
                var total;
                total = array.length;
                args[0] = function(current, val, i) {
                    return when(current, function(c) {
                        return when(val, function(value) {
                            return reduceFunc(c, value, i, total);
                        });
                    });
                };
                return reduceArray.apply(array, args);
            });
        }
        function chain(promiseOrValue, resolver, resolveValue) {
            var useResolveValue = arguments.length > 2;
            return when(promiseOrValue, function(val) {
                val = useResolveValue ? resolveValue : val;
                resolver.resolve(val);
                return val;
            }, function(reason) {
                resolver.reject(reason);
                return rejected(reason);
            }, function(update) {
                "function" == typeof resolver.notify && resolver.notify(update);
                return update;
            });
        }
        function processQueue(queue, value) {
            var handler, i = 0;
            while (handler = queue[i++]) handler(value);
        }
        function checkCallbacks(start, arrayOfCallbacks) {
            var arg, i = arrayOfCallbacks.length;
            while (i > start) {
                arg = arrayOfCallbacks[--i];
                if (null != arg && "function" != typeof arg) throw new Error("arg " + i + " must be a function");
            }
        }
        function noop() {}
        function identity(x) {
            return x;
        }
        var reduceArray, slice, undef;
        when.defer = defer;
        when.resolve = resolve;
        when.reject = reject;
        when.join = join;
        when.all = all;
        when.map = map;
        when.reduce = reduce;
        when.any = any;
        when.some = some;
        when.chain = chain;
        when.isPromise = isPromise;
        Promise.prototype = {
            always: function(onFulfilledOrRejected, onProgress) {
                return this.then(onFulfilledOrRejected, onFulfilledOrRejected, onProgress);
            },
            otherwise: function(onRejected) {
                return this.then(undef, onRejected);
            },
            yield: function(value) {
                return this.then(function() {
                    return value;
                });
            },
            spread: function(onFulfilled) {
                return this.then(function(array) {
                    return all(array, function(array) {
                        return onFulfilled.apply(undef, array);
                    });
                });
            }
        };
        slice = [].slice;
        reduceArray = [].reduce || function(reduceFunc) {
            var arr, args, reduced, len, i;
            i = 0;
            arr = Object(this);
            len = arr.length >>> 0;
            args = arguments;
            if (1 >= args.length) for (;;) {
                if (i in arr) {
                    reduced = arr[i++];
                    break;
                }
                if (++i >= len) throw new TypeError();
            } else reduced = args[1];
            for (;len > i; ++i) i in arr && (reduced = reduceFunc(reduced, arr[i], i, arr));
            return reduced;
        };
        return when;
    });
})("function" == typeof define && define.amd ? define : function(factory) {
    "object" == typeof exports ? module.exports = factory() : this.when = factory();
});