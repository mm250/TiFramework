var namespace = require("morcode/base/Namespace");
var _ = require("alloy/underscore");
var ignoredFields = ['plugScope', 'plugAutoset'];
var Alloy = require('alloy');

var global = this;

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

Pair.prototype.getNamespace = function(item){
	var pair = this;
	if (_.isString(item) && item.indexOf('{') == 0){
		item.replace((/\\?\{([^{}]+)\}/g), function(match, name){
			item = namespace(global, name);
    	})
   	}
   	return item;
}

Pair.prototype.setArrayNamespace = function(){
	var pair = this;
	var newArray = [];
	_.each(pair.value, function(item, i){
		newArray[i] = pair.getNamespace(item);
	})
	pair.value = newArray;
}

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
	if ((typeof pair.value === 'string' && pair.value.indexOf('$') === 0) ||
        (_.isObject(pair.value) && pair.value.plugType)) {
    	return true;
    }
    return false;
};

Pair.prototype.isArray = function() {
	var pair = this;
	return _.isArray(pair.value);
};

Pair.prototype.isObject = function() {
	var pair = this;
	return (_.isObject(pair.value) && (!_.isArray(pair.value)));
};

Pair.prototype.isIgnored = function() {
	var pair = this;
	return pair && _.contains(ignoredFields, pair.key);
};

Pair.prototype.refKey = function() {
	var pair = this;
	if (pair.isReference()) {
		return (_.isString(pair.value)) ? pair.value.replace('$', '') : pair.value
	} else {
		return pair.key;
	}
}

module.exports = Pair; 