(function(define) {
    define([ "./when" ], function(when) {
        return function(tasks) {
            var initialArgs, runTask;
            initialArgs = Array.prototype.slice.call(arguments, 1);
            runTask = function(task, args) {
                runTask = function(task, arg) {
                    return task(arg);
                };
                return task.apply(null, args);
            };
            return when.reduce(tasks, function(args, task) {
                return runTask(task, args);
            }, initialArgs);
        };
    });
})("function" == typeof define && define.amd ? define : function(deps, factory) {
    "object" == typeof exports ? module.exports = factory(require("./when")) : this.when_pipeline = factory(this.when);
});