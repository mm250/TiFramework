var _ = require("alloy/underscore");

module.exports = {
    animateProperty: function(settings) {
        var node = settings.node;
        var options = {};
        _.each(settings.properties, function(item, property) {
            if (_.isObject(item)) {
                node["set" + property[0].toUpperCase() + property.slice(1)](item.start);
                item.end && (options[property] = item.end);
            } else options[property] = item;
        });
        var animation = Ti.UI.createAnimation(options);
        animation.addEventListener("complete", function() {
            _.each(options, function(item, property) {
                var method = "set" + property[0].toUpperCase() + property.slice(1);
                node[method] && node[method](item);
            });
            settings.onComplete && settings.onComplete();
        });
        return {
            play: function(p_node, p_animation) {
                return function() {
                    p_node.animate(p_animation);
                };
            }(node, animation)
        };
    },
    bounceIn: function(settings) {
        var animate = this;
        return animate.animateProperty({
            node: settings.node,
            properties: {
                left: Ti.Platform.displayCaps.platformWidth,
                duration: settings.properties.duration
            },
            onComplete: function() {
                animate.animateProperty({
                    node: settings.node,
                    properties: {
                        left: 0,
                        duration: settings.properties.duration
                    },
                    onComplete: settings.onComplete
                }).play();
            }
        });
    }
};