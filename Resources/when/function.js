(function(define) {
    define([ "./when" ], function(when) {
        function apply(func, promisedArgs) {
            return when.all(promisedArgs || [], function(args) {
                return func.apply(null, args);
            });
        }
        function call(func) {
            return apply(func, slice.call(arguments, 1));
        }
        function bind(func) {
            var args = slice.call(arguments, 1);
            return function() {
                return apply(func, args.concat(slice.call(arguments)));
            };
        }
        function compose(f) {
            var funcs = slice.call(arguments, 1);
            return function() {
                var args = slice.call(arguments);
                var firstPromise = apply(f, args);
                return when.reduce(funcs, function(arg, func) {
                    return func(arg);
                }, firstPromise);
            };
        }
        var slice;
        slice = Array.prototype.slice;
        return {
            apply: apply,
            call: call,
            bind: bind,
            compose: compose
        };
    });
})("function" == typeof define ? define : function(deps, factory) {
    "undefined" != typeof exports ? module.exports = factory(require("./when")) : this.when_function = factory(this.when);
});