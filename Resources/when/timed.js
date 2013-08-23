(function(define) {
    define([ "./timeout", "./delay" ], function(timeout, delay) {
        return {
            timeout: timeout,
            delay: delay
        };
    });
})("function" == typeof define ? define : function(deps, factory) {
    "undefined" != typeof module ? module.exports = factory.apply(this, deps.map(require)) : this.when_timed = factory(this.when_timeout, this.when_delay);
});