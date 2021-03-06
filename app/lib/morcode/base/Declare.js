var _ = require("alloy/underscore");
var _clone = require("morcode/base/Clone");

var create = (function() {
	
	var clazz = function() {};

	return function(definition) {
		clazz.prototype = definition;
		return new clazz();
	}
	
})(); 

 
var Declare = function(definition) {

	var superPattern = /xyz/.test(function() { xyz; }) ? /\b_super\b/ : /.*/;

	// reference to parent.
	var _parent = {};

	// extend or create new class.
	var proto = (definition.extends) ? create(_parent = definition.extends.prototype) : create();

    // mixin implements.
    if (definition.implements) {
        var impl = _.isArray(definition.implements) ? definition.implements : [definition.implements];
        _.each(impl, function(obj, i){
            impl[i] = _.isFunction(obj) ? new obj() : _clone(obj);
        });
        impl.unshift(proto);
        _.extend.apply(null, impl);
    }


	// assign definition.
	for (var prop in definition) {

		proto[prop] = typeof definition[prop] == "function" && typeof _parent[prop] == "function" && superPattern.test(definition[prop]) ? 
		
		(function(propname, fn) {

			return function() {

				var tmp = this._super;
				
				this._super = _parent[propname];

				var rtn = fn.apply(this, arguments);

				this._super = tmp;

				return rtn;
			}
			
		})(prop, definition[prop]) : definition[prop];
	}
	
	clazz = (definition.hasOwnProperty("constructor")) ? proto.constructor : function() {
		try {
			if (!_.isEmpty(_parent)){
				_parent["constructor"].apply(this, arguments);
			}	
		} catch(ex){
			console.error(['Error: \n', ex].join(""));
			throw ex;
		}
	};
	
	clazz._parent = _parent;
	clazz.prototype = proto;
	clazz.definition = definition;
	return clazz;
};

module.exports = Declare