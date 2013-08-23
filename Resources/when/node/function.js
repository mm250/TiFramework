(function(define) {
    define([ "../when" ], function(when) {
        function apply(func, args) {
            return when.all(args || []).then(function(resolvedArgs) {
                var d = when.defer();
                var callback = createCallback(d.resolver);
                func.apply(null, resolvedArgs.concat(callback));
                return d.promise;
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
        function createCallback(resolver) {
            return function(err, value) {
                err ? resolver.reject(err) : arguments.length > 2 ? resolver.resolve(slice.call(arguments, 1)) : resolver.resolve(value);
            };
        }
        var slice;
        slice = Array.prototype.slice;
        return {
            apply: apply,
            call: call,
            bind: bind,
            createCallback: createCallback
        };
    });
})("function" == typeof define ? define : function(deps, factory) {
    "undefined" != typeof exports ? module.exports = factory(require("../when")) : this.when_node_function = factory(this.when);
});