(function(define) {
    define([ "when", "unfold" ], function(when, unfold) {
        return function(generator, condition, seed) {
            function append(value, newSeed) {
                result.push(value);
                return newSeed;
            }
            var result = [];
            return unfold(generator, condition, append, seed).yield(result);
        };
    });
})("function" == typeof define && define.amd ? define : function(deps, factory) {
    "object" == typeof exports ? module.exports = factory(require("../when"), require("../unfold")) : this.when_unfoldList = factory(this.when, this.when_unfold);
});