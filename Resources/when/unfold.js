(function(define) {
    define([ "when" ], function(when) {
        return function unfold(unspool, condition, handler, seed) {
            return when(seed, function(seed) {
                function next(item, newSeed) {
                    return when(handler(item), function() {
                        return unfold(unspool, condition, handler, newSeed);
                    });
                }
                return when(condition(seed), function(done) {
                    return done ? seed : when.resolve(unspool(seed)).spread(next);
                });
            });
        };
    });
})("function" == typeof define && define.amd ? define : function(deps, factory) {
    "object" == typeof exports ? module.exports = factory(require("./when")) : this.when_unfold = factory(this.when);
});