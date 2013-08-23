function Pair(xs) {
    var pair = this;
    pair.key = xs[0];
    pair.value = pair.getNamespace(xs[1]);
}

function makeObject(key, val) {
    var obj = {};
    obj[key] = val;
    return obj;
}

var namespace = require("morcode/base/Namespace");

var ignoredFields = [ "plugScope", "plugAutoset" ];

var global = this;

Pair.prototype.getNamespace = function(item) {
    _.isString(item) && 0 == item.indexOf("{") && item.replace(/\\?\{([^{}]+)\}/g, function(match, name) {
        item = namespace(global, name);
    });
    return item;
};

Pair.prototype.setArrayNamespace = function() {
    var pair = this;
    var newArray = [];
    _.each(pair.value, function(item, i) {
        newArray[i] = pair.getNamespace(item);
    });
    pair.value = newArray;
};

Pair.prototype.setStrNamespace = function() {
    var pair = this;
    pair.value = pair.getNamespace(pair.value);
};

Pair.prototype.process = function() {
    var pair = this;
    return pair.isIgnored() ? {} : makeObject(pair.key, pair.value);
};

Pair.prototype.isReference = function() {
    var pair = this;
    if ("string" == typeof pair.value && 0 === pair.value.indexOf("$") || _.isObject(pair.value) && pair.value.plugType) return true;
    return false;
};

Pair.prototype.isArray = function() {
    var pair = this;
    return _.isArray(pair.value);
};

Pair.prototype.isObject = function() {
    var pair = this;
    return _.isObject(pair.value) && !_.isArray(pair.value);
};

Pair.prototype.isIgnored = function() {
    var pair = this;
    return pair && _.contains(ignoredFields, pair.key);
};

Pair.prototype.refKey = function() {
    var pair = this;
    return pair.isReference() ? _.isString(pair.value) ? pair.value.replace("$", "") : pair.value : pair.key;
};

module.exports = Pair;