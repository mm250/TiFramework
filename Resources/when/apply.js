(function(define) {
    define(function() {
        var toString = Object.prototype.toString;
        return function(f) {
            return function(array) {
                if ("[object Array]" != toString.call(array)) throw new Error("apply called with non-array arg");
                return f.apply(null, array);
            };
        };
    });
})("function" == typeof define ? define : function(factory) {
    "undefined" != typeof module ? module.exports = factory() : this.when_apply = factory();
});