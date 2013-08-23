function buildConfig() {
    var config = require(Alloy.CFG.plugConfig);
    var configDevice = Alloy.CFG.plugConfigDevice ? require(Alloy.CFG.plugConfigDevice) : {};
    return _.extend(config, configDevice);
}

function resolve(mappingId, options) {
    var configMapping = _.isObject(mappingId) ? function() {
        if (!_.has(mappingId, "plugType")) {
            console.error([ "No reference type defined for: ", JSON.stringify(mappingId) ].join(""));
            throw "plug confing type error";
        }
        return mappingId;
    }() : namespace(config, mappingId);
    if (!configMapping) {
        console.error([ "No config found for reference: ", mappingId ].join(""));
        throw "plug confing mapping error";
    }
    options && _.extend(configMapping, options);
    try {
        var Klass = require(configMapping.plugType);
        void 0 === configMapping.plugAutoset && (configMapping.plugAutoset = true);
        return isSingleton(configMapping) ? addToSingleton(Klass, configMapping, mappingId) : create(Klass, configMapping);
    } catch (ex) {
        console.error([ "Trying to config mapping: ", JSON.stringify(mappingId), " getting error: ", ex ].join(""));
        throw ex;
    }
}

function release(mappingId) {
    var configMapping = Alloy.CFG.iocPlug[mappingId];
    if (!configMapping) throw [ "No config found for reference: ", mappingId ].join("");
    try {
        if (isSingleton(configMapping)) {
            var Klass = require(configMapping.plugType);
            Klass["singletons"] && Klass["singletons"][mappingId] && (Klass["singletons"][mappingId] = null);
        }
    } catch (ex) {
        throw ex;
    }
}

function create(Klass, configMapping) {
    var aop = false;
    var Klass = aop ? defineCreateClass(Klass.definition) : Klass;
    var klass = configMapping.plugScope === plugScope.OBJECT ? Klass : function() {
        return new Klass(configMapping.plugAutoset ? {} : wire(makeKeyPairs(configMapping)));
    }();
    if (configMapping.plugAutoset) {
        _.extend(klass, wire(makeKeyPairs(configMapping)));
        klass.afterPlugAutoSet && klass.afterPlugAutoSet();
    }
    return klass;
}

function defineCreateClass(definition) {
    var Declare = require("tui/base/Declare");
    return Declare(definition);
}

function applyMixins() {}

function addToSingleton(Klass, configMapping, mappingId) {
    Klass["singletons"] ? null : Klass["singletons"] = {};
    return Klass["singletons"][mappingId] ? Klass["singletons"][mappingId] : Klass["singletons"][mappingId] = create(Klass, configMapping);
}

function isSingleton(configMapping) {
    return configMapping.plugScope === plugScope.SINGLETON;
}

function makeKeyPairs(plugConfig) {
    var context = this;
    return _.map(_.pairs(plugConfig), function(configItem) {
        return new Pairs(configItem, context);
    });
}

function makeObject(key, val) {
    var obj = {};
    obj[key] = val;
    return obj;
}

function wire(pairs) {
    var pair = _.first(pairs);
    var restOfPairs = _.rest(pairs);
    if (_.isEmpty(pairs)) return {};
    if (pair.isReference()) return _.extend(makeObject(pair.key, resolve(pair.refKey())), wire(restOfPairs));
    if (pair.isObject() && 0 === pair.key.indexOf("*")) {
        pair.key = pair.key.replace("*", "");
        wire(makeKeyPairs(pair.value));
    }
    pair.isArray() && _.each(pair.value, function(item, i) {
        pair.value[i] = pair.isReference.apply({
            value: item
        }) ? resolve(pair.refKey.apply({
            value: item,
            isReference: function() {
                return true;
            }
        })) : function() {
            return pair.isObject.apply({
                value: item
            }) ? wire(makeKeyPairs(pair.value)) : item;
        }();
    });
    return _.extend(pair.process(), wire(restOfPairs));
}

var Alloy = require("alloy");

var _ = require("alloy/underscore");

var Pairs = require("morcode/ioc/Pairs");

var namespace = require("morcode/base/Namespace");

var plugScope = {
    SINGLETON: "singleton",
    CLASS: "class",
    OBJECT: "object"
};

var config = buildConfig();

module.exports = {
    resolve: resolve
};