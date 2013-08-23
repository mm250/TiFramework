(function(define) {
    define([ "./when" ], function(when) {
        return function(tasks) {
            var args = Array.prototype.slice.call(arguments, 1);
            return when.reduce(tasks, function(results, task) {
                return when(task.apply(null, args), function(result) {
                    results.push(result);
                    return results;
                });
            }, []);
        };
    });
})("function" == typeof define && define.amd ? define : function(deps, factory) {
    "object" == typeof exports ? module.exports = factory(require("./when")) : this.when_sequence = factory(this.when);
});