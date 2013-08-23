var _ = require("alloy/underscore");

var namespace = require("morcode/base/Namespace");

var global = this;

module.exports = {
    parse: function(alloyJson, view) {
        console.log(JSON.stringify(alloyJson));
        var parser = this;
        parser.createUi(alloyJson, view);
    },
    createUi: function(alloyJson, uicomponent, p_uicomponent) {
        var parser = this;
        if (uicomponent && _.isString(uicomponent)) {
            var options = {};
            if (alloyJson.$) {
                _.each(alloyJson.$, function(value, attr) {
                    if ("class" !== attr) {
                        var p = value.split(".");
                        options[attr] = p.length > 1 ? namespace(global, value) : value;
                    }
                });
                delete alloyJson.$;
            }
            uicomponent = Ti.UI["create" + uicomponent](options);
            if (alloyJson._) {
                uicomponent.text = alloyJson._;
                delete alloyJson._;
            }
            p_uicomponent.add(uicomponent);
        }
        if (_.isString(alloyJson)) {
            uicomponent.text = alloyJson;
            return;
        }
        _.each(alloyJson, function(tag, tagname) {
            _.isArray(tag) || _.isString(tag) ? _.isArray(tag) && _.each(tag, function(item) {
                parser.createUi(item, tagname, uicomponent);
            }) : parser.createUi(tag, tagname, uicomponent);
        });
    }
};