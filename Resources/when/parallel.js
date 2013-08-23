(function(define) {
    define([ "./when" ], function(when) {
        return function(tasks) {
            var args = Array.prototype.slice.call(arguments, 1);
            return when.map(tasks, function(task) {
                return task.apply(null, args);
            });
        };
    });
})("function" == typeof define && define.amd ? define : function(deps, factory) {
    "object" == typeof exports ? module.exports = factory(require("./when")) : this.when_parallel = factory(this.when);
});