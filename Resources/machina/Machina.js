(function(t, e) {
    "object" == typeof module && module.exports ? module.exports = function(t) {
        return t = t || require("underscore"), e(t);
    } : "function" == typeof define && define.amd ? define([ "underscore" ], function(i) {
        return e(i, t);
    }) : t.machina = e(t._, t);
})(this, function(t, e, i) {
    var n = [].slice, s = "transition", r = "handler", a = "handling", o = "handled", u = "nohandler", c = "transition", h = "invalidstate", l = "deferred", f = "newfsm", p = {
        makeFsmNamespace: function() {
            var t = 0;
            return function() {
                return "fsm." + t++;
            };
        }(),
        getDefaultOptions: function() {
            return {
                initialState: "uninitialized",
                eventListeners: {
                    "*": []
                },
                states: {},
                eventQueue: [],
                namespace: p.makeFsmNamespace(),
                targetReplayState: "",
                state: i,
                priorState: i,
                _priorAction: "",
                _currentAction: ""
            };
        }
    };
    if (!t.deepExtend) {
        var v = {
            "*": function(t, e, i) {
                t[e] = i;
            },
            object: function(t, e, i) {
                t[e] = m({}, t[e] || {}, i);
            },
            array: function(e, i, n) {
                e[i] = [], t.each(n, function(t, n) {
                    v[g(t)](e[i], n, t);
                }, this);
            }
        }, d = function(e) {
            return t.isArray(e) ? "array" : t.isDate(e) ? "date" : t.isRegExp(e) ? "regex" : typeof e;
        }, g = function(t) {
            var e = d(t);
            return v[e] ? e : "*";
        }, m = function(e) {
            return t.each(n.call(arguments, 1), function(i) {
                t.each(i, function(t, i) {
                    v[g(t)](e, i, t);
                });
            }), e;
        };
        t.mixin({
            deepExtend: m
        });
    }
    var y = function(e) {
        t.extend(this, e), t.defaults(this, p.getDefaultOptions()), this.initialize.apply(this, arguments), 
        L.emit(f, this), this.initialState && this.transition(this.initialState);
    };
    t.extend(y.prototype, {
        initialize: function() {},
        emit: function(e) {
            var s = arguments;
            this.eventListeners["*"] && t.each(this.eventListeners["*"], function(t) {
                try {
                    t.apply(this, n.call(s, 0));
                } catch (e) {
                    console && console.log !== i && console.log("" + e);
                }
            }, this), this.eventListeners[e] && t.each(this.eventListeners[e], function(t) {
                try {
                    t.apply(this, n.call(s, 1));
                } catch (e) {
                    console && console.log !== i && console.log("" + e);
                }
            }, this);
        },
        handle: function(e) {
            if (!this.inExitHandler) {
                var s, c, h, l, f = this.states, p = this.state, v = n.call(arguments, 0);
                this.currentActionArgs = v, f[p][e] || f[p]["*"] || this["*"] ? (s = f[p][e] ? e : "*", 
                h = "*" === s, f[p][s] ? (c = f[p][s], l = p + "." + s) : (c = this["*"], l = "*"), 
                this._currentAction || (this._currentAction = l), this.emit.call(this, a, {
                    inputType: e,
                    args: v.slice(1)
                }), t.isFunction(c) && (c = c.apply(this, h ? v : v.slice(1))), t.isString(c) && this.transition(c), 
                this.emit.call(this, o, {
                    inputType: e,
                    args: v.slice(1)
                }), this._priorAction = this._currentAction, this._currentAction = "", this.processQueue(r)) : this.emit.call(this, u, {
                    inputType: e,
                    args: v.slice(1)
                }), this.currentActionArgs = i;
            }
        },
        transition: function(t) {
            if (!this.inExitHandler && t !== this.state) {
                var e;
                if (this.states[t]) return this.targetReplayState = t, this.priorState = this.state, 
                this.state = t, e = this.priorState, this.states[e] && this.states[e]._onExit && (this.inExitHandler = !0, 
                this.states[e]._onExit.call(this), this.inExitHandler = !1), this.emit.call(this, c, {
                    fromState: e,
                    action: this._currentAction,
                    toState: t
                }), this.states[t]._onEnter && this.states[t]._onEnter.call(this), this.targetReplayState === t && this.processQueue(s), 
                i;
                this.emit.call(this, h, {
                    state: this.state,
                    attemptedState: t
                });
            }
        },
        processQueue: function(e) {
            var i = e === s ? function(t) {
                return t.type === s && (!t.untilState || t.untilState === this.state);
            } : function(t) {
                return t.type === r;
            }, n = t.filter(this.eventQueue, i, this);
            this.eventQueue = t.difference(this.eventQueue, n), t.each(n, function(t) {
                this.handle.apply(this, t.args);
            }, this);
        },
        clearQueue: function(e, i) {
            if (e) {
                var n;
                e === s ? n = function(t) {
                    return t.type === s && (i ? t.untilState === i : !0);
                } : e === r && (n = function(t) {
                    return t.type === r;
                }), this.eventQueue = t.filter(this.eventQueue, n);
            } else this.eventQueue = [];
        },
        deferUntilTransition: function(t) {
            if (this.currentActionArgs) {
                var e = {
                    type: s,
                    untilState: t,
                    args: this.currentActionArgs
                };
                this.eventQueue.push(e), this.emit.call(this, l, {
                    state: this.state,
                    queuedArgs: e
                });
            }
        },
        deferUntilNextHandler: function() {
            if (this.currentActionArgs) {
                var t = {
                    type: s,
                    args: this.currentActionArgs
                };
                this.eventQueue.push(t), this.emit.call(this, l, {
                    state: this.state,
                    queuedArgs: t
                });
            }
        },
        on: function(t, e) {
            var i = this;
            return i.eventListeners[t] || (i.eventListeners[t] = []), i.eventListeners[t].push(e), 
            {
                eventName: t,
                callback: e,
                off: function() {
                    i.off(t, e);
                }
            };
        },
        off: function(e, i) {
            e ? this.eventListeners[e] && (this.eventListeners[e] = i ? t.without(this.eventListeners[e], i) : []) : this.eventListeners = {};
        }
    }), y.prototype.trigger = y.prototype.emit;
    var A = function() {}, x = function(e, i, n) {
        var s;
        return s = i && i.hasOwnProperty("constructor") ? i.constructor : function() {
            e.apply(this, arguments);
        }, t.deepExtend(s, e), A.prototype = e.prototype, s.prototype = new A(), i && t.deepExtend(s.prototype, i), 
        n && t.deepExtend(s, n), s.prototype.constructor = s, s.__super__ = e.prototype, 
        s;
    };
    y.extend = function(t, e) {
        var i = x(this, t, e);
        return i.extend = this.extend, i;
    };
    var L = {
        Fsm: y,
        utils: p,
        on: function(t, e) {
            return this.eventListeners[t] || (this.eventListeners[t] = []), this.eventListeners[t].push(e), 
            e;
        },
        off: function(e, i) {
            this.eventListeners[e] && (this.eventListeners[e] = t.without(this.eventListeners[e], i));
        },
        trigger: function(e) {
            var i = arguments, s = this.eventListeners[e] || [];
            s && s.length && t.each(s, function(t) {
                t.apply(null, n.call(i, 1));
            });
        },
        eventListeners: {
            newFsm: []
        }
    };
    return L.emit = L.trigger, L;
});