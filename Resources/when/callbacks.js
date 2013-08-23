(function(define) {
    define([ "./when" ], function(when) {
        function apply(asyncFunction, extraAsyncArgs) {
            return when.all(extraAsyncArgs || []).then(function(args) {
                var deferred = when.defer();
                var asyncArgs = args.concat(alwaysUnary(deferred.resolve), alwaysUnary(deferred.reject));
                asyncFunction.apply(null, asyncArgs);
                return deferred.promise;
            });
        }
        function call(asyncFunction) {
            var extraAsyncArgs = slice.call(arguments, 1);
            return apply(asyncFunction, extraAsyncArgs);
        }
        function bind(asyncFunction) {
            var leadingArgs = slice.call(arguments, 1);
            return function() {
                var trailingArgs = slice.call(arguments, 0);
                return apply(asyncFunction, leadingArgs.concat(trailingArgs));
            };
        }
        function promisify(asyncFunction, positions) {
            return function() {
                var finalArgs = fillableArray();
                var deferred = when.defer();
                "callback" in positions && finalArgs.add(positions.callback, alwaysUnary(deferred.resolve));
                "errback" in positions && finalArgs.add(positions.errback, alwaysUnary(deferred.reject));
                return when.all(arguments).then(function(args) {
                    finalArgs.fillHolesWith(args);
                    asyncFunction.apply(null, finalArgs.toArray());
                    return deferred.promise;
                });
            };
        }
        function fillableArray() {
            var beginningArgs = [], endArgs = [];
            return {
                add: function(index, value) {
                    if (index >= 0) beginningArgs[index] = value; else {
                        var offsetFromEnd = Math.abs(index) - 1;
                        endArgs[offsetFromEnd] = value;
                    }
                },
                fillHolesWith: function(arrayLike) {
                    var i, j;
                    for (i = 0, j = 0; arrayLike.length > i; i++, j++) {
                        while (j in beginningArgs) j++;
                        beginningArgs[j] = arrayLike[i];
                    }
                },
                toArray: function() {
                    var result = slice.call(beginningArgs, 0);
                    for (var i = endArgs.length - 1; i >= 0; i--) result.push(endArgs[i]);
                    return result;
                }
            };
        }
        function alwaysUnary(fn) {
            return function() {
                1 >= arguments.length ? fn.apply(null, arguments) : fn.call(null, slice.call(arguments, 0));
            };
        }
        var slice = [].slice;
        return {
            apply: apply,
            call: call,
            bind: bind,
            promisify: promisify
        };
    });
})("function" == typeof define ? define : function(deps, factory) {
    "undefined" != typeof module ? module.exports = factory(require("./when")) : this.when_callback = factory(this.when);
});