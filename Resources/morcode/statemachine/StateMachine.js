var StateMachine = {
    VERSION: "2.2.0",
    Result: {
        SUCCEEDED: 1,
        NOTRANSITION: 2,
        CANCELLED: 3,
        PENDING: 4
    },
    Error: {
        INVALID_TRANSITION: 100,
        PENDING_TRANSITION: 200,
        INVALID_CALLBACK: 300
    },
    WILDCARD: "*",
    ASYNC: "async",
    create: function(cfg, target) {
        var initial = "string" == typeof cfg.initial ? {
            state: cfg.initial
        } : cfg.initial;
        var terminal = cfg.terminal || cfg["final"];
        var fsm = target || cfg.target || {};
        var events = cfg.events || [];
        var callbacks = cfg.callbacks || {};
        var map = {};
        var add = function(e) {
            var from = e.from instanceof Array ? e.from : e.from ? [ e.from ] : [ StateMachine.WILDCARD ];
            map[e.name] = map[e.name] || {};
            for (var n = 0; from.length > n; n++) map[e.name][from[n]] = e.to || from[n];
        };
        if (initial) {
            initial.event = initial.event || "startup";
            add({
                name: initial.event,
                from: "none",
                to: initial.state
            });
        }
        for (var n = 0; events.length > n; n++) add(events[n]);
        for (var name in map) map.hasOwnProperty(name) && (fsm[name] = StateMachine.buildEvent(name, map[name]));
        for (var name in callbacks) callbacks.hasOwnProperty(name) && (fsm[name] = callbacks[name]);
        fsm.current = "none";
        fsm.is = function(state) {
            return state instanceof Array ? state.indexOf(this.current) >= 0 : this.current === state;
        };
        fsm.can = function(event) {
            return !this.transition && (map[event].hasOwnProperty(this.current) || map[event].hasOwnProperty(StateMachine.WILDCARD));
        };
        fsm.cannot = function(event) {
            return !this.can(event);
        };
        fsm.error = cfg.error || function(name, from, to, args, error, msg, e) {
            throw e || msg;
        };
        fsm.isFinished = function() {
            return this.is(terminal);
        };
        initial && !initial.defer && fsm[initial.event]();
        return fsm;
    },
    doCallback: function(fsm, func, name, from, to, args) {
        if (func) try {
            return func.apply(fsm, [ name, from, to ].concat(args));
        } catch (e) {
            return fsm.error(name, from, to, args, StateMachine.Error.INVALID_CALLBACK, "an exception occurred in a caller-provided callback function", e);
        }
    },
    beforeAnyEvent: function(fsm, name, from, to, args) {
        return StateMachine.doCallback(fsm, fsm["onbeforeevent"], name, from, to, args);
    },
    afterAnyEvent: function(fsm, name, from, to, args) {
        return StateMachine.doCallback(fsm, fsm["onafterevent"] || fsm["onevent"], name, from, to, args);
    },
    leaveAnyState: function(fsm, name, from, to, args) {
        return StateMachine.doCallback(fsm, fsm["onleavestate"], name, from, to, args);
    },
    enterAnyState: function(fsm, name, from, to, args) {
        return StateMachine.doCallback(fsm, fsm["onenterstate"] || fsm["onstate"], name, from, to, args);
    },
    changeState: function(fsm, name, from, to, args) {
        return StateMachine.doCallback(fsm, fsm["onchangestate"], name, from, to, args);
    },
    beforeThisEvent: function(fsm, name, from, to, args) {
        return StateMachine.doCallback(fsm, fsm["onbefore" + name], name, from, to, args);
    },
    afterThisEvent: function(fsm, name, from, to, args) {
        return StateMachine.doCallback(fsm, fsm["onafter" + name] || fsm["on" + name], name, from, to, args);
    },
    leaveThisState: function(fsm, name, from, to, args) {
        return StateMachine.doCallback(fsm, fsm["onleave" + from], name, from, to, args);
    },
    enterThisState: function(fsm, name, from, to, args) {
        return StateMachine.doCallback(fsm, fsm["onenter" + to] || fsm["on" + to], name, from, to, args);
    },
    beforeEvent: function(fsm, name, from, to, args) {
        if (false === StateMachine.beforeThisEvent(fsm, name, from, to, args) || false === StateMachine.beforeAnyEvent(fsm, name, from, to, args)) return false;
    },
    afterEvent: function(fsm, name, from, to, args) {
        StateMachine.afterThisEvent(fsm, name, from, to, args);
        StateMachine.afterAnyEvent(fsm, name, from, to, args);
    },
    leaveState: function(fsm, name, from, to, args) {
        var specific = StateMachine.leaveThisState(fsm, name, from, to, args), general = StateMachine.leaveAnyState(fsm, name, from, to, args);
        if (false === specific || false === general) return false;
        if (StateMachine.ASYNC === specific || StateMachine.ASYNC === general) return StateMachine.ASYNC;
    },
    enterState: function(fsm, name, from, to, args) {
        StateMachine.enterThisState(fsm, name, from, to, args);
        StateMachine.enterAnyState(fsm, name, from, to, args);
    },
    buildEvent: function(name, map) {
        return function() {
            var from = this.current;
            var to = map[from] || map[StateMachine.WILDCARD] || from;
            var args = Array.prototype.slice.call(arguments);
            if (this.transition) return this.error(name, from, to, args, StateMachine.Error.PENDING_TRANSITION, "event " + name + " inappropriate because previous transition did not complete");
            if (this.cannot(name)) return this.error(name, from, to, args, StateMachine.Error.INVALID_TRANSITION, "event " + name + " inappropriate in current state " + this.current);
            if (false === StateMachine.beforeEvent(this, name, from, to, args)) return StateMachine.Result.CANCELLED;
            if (from === to) {
                StateMachine.afterEvent(this, name, from, to, args);
                return StateMachine.Result.NOTRANSITION;
            }
            var fsm = this;
            this.transition = function() {
                fsm.transition = null;
                fsm.current = to;
                StateMachine.enterState(fsm, name, from, to, args);
                StateMachine.changeState(fsm, name, from, to, args);
                StateMachine.afterEvent(fsm, name, from, to, args);
                return StateMachine.Result.SUCCEEDED;
            };
            this.transition.cancel = function() {
                fsm.transition = null;
                StateMachine.afterEvent(fsm, name, from, to, args);
            };
            var leave = StateMachine.leaveState(this, name, from, to, args);
            if (false === leave) {
                this.transition = null;
                return StateMachine.Result.CANCELLED;
            }
            if (StateMachine.ASYNC === leave) return StateMachine.Result.PENDING;
            if (this.transition) return this.transition();
        };
    }
};

module.exports = StateMachine;