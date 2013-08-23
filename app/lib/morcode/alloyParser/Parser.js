var _ = require("alloy/underscore");
var namespace = require("morcode/base/Namespace");

var global = this;



module.exports = {

    parse : function( /*object*/ alloyJson, /*alloy ui*/ view){
    	// Function: parse
    	// 		Parses the given alloy json, to create titanium UI compoments.
    	
    	console.log(JSON.stringify(alloyJson))
    	
    	var parser = this;  
		parser.createUi(alloyJson, view);
    },

    createUi : function(/*object*/ alloyJson, /*alloy ui*/ uicomponent, /*alloy ui*/ p_uicomponent){
        var parser = this;
 		
 		// if uicomponent is a string, we need to create the associate Ti component, and add it to parent.
        if (uicomponent && _.isString(uicomponent)){
        	
        	
        	var options = {};
        	
        	if (alloyJson.$){
                _.each(alloyJson.$, function(value, attr){
                	if (attr !== "class"){
                		var p = value.split('.');
                		options[attr] = p.length > 1 ? namespace(global, value) : value
                	}
                })
                delete alloyJson.$;
            }
        	
            uicomponent = Ti.UI["create" + uicomponent](options);
            
            if (alloyJson._){
            	uicomponent.text = alloyJson._;
                delete alloyJson._;
            }
            
            p_uicomponent.add(uicomponent);
        }

        if (_.isString(alloyJson)){
        	// if alloyJson is a string, and not a object
        	// we just set the uicomponent text.
        	uicomponent.text = alloyJson;
        	return;
        }

       _.each(alloyJson, function(tag, tagname){
            
           if (!_.isArray(tag) && !_.isString(tag)){
                parser.createUi(tag, tagname, uicomponent);
           } else if (_.isArray(tag)){
               _.each(tag, function(item, i){
                   parser.createUi(item, tagname, uicomponent);
               })
           }
       });
    }
}