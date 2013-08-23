// ----------------------------------------------- imports
var Alloy = require("alloy");
var _ = require("alloy/underscore");
var Declare = require('tui/base/Declare');
var AnimateBase = require("tui/animation/AnimateBase"); 
var animate = require("tui/animation/Animate"); 

// ----------------------------------------------- class

var TileFlip = Declare({
	
	extends : AnimateBase,

	animate : function(options){

        var tileFlip = this;

		tileFlip._super(options);

		if (!tileFlip.node) return;

        // convert tile to an image
		var imgTile = tileFlip.node.toImage();
    	
    	var imageTileView = Ti.UI.createImageView({
        	image  : imgTile,
        	width  : Ti.UI.FILL,
        	height : Ti.UI.FILL
    	});

        imageTileView.animate({
            opacity  : 0,
            delay    : tileFlip.settings.animSpeed / 4,
            duration : tileFlip.settings.animSpeed / 4
        });

        tileFlip.mask.animate({
            backgroundColor : "rgba(255,255,255, 1)",
            duration : 0,
            delay : tileFlip.settings.animSpeed / 2
        });

        tileFlip.node.add(imageTileView);
        tileFlip.node.zIndex  = 100;
        tileFlip.innerTileView.opacity = 0;

        tileFlip.node.animate({
            width : Alloy.Globals.Styles.page.width,
            height : Alloy.Globals.Styles.page.height,
            top : Alloy.Globals.Styles.template.homeContentOffset + Alloy.Globals.Styles.page.top,
            left : Alloy.Globals.Styles.page.left,
            transform : Ti.UI.create3DMatrix().rotate(tileFlip.settings.rotateDegrees, 0, 1, 0),
            delay : tileFlip.settings.animSpeed / 2,
            duration : tileFlip.settings.animSpeed,
            curve : tileFlip.settings.curve
        }, function(){

            // onBeforeComplete
            if (tileFlip.onBeforeComplete) {
                tileFlip.onBeforeComplete();
            }

            Alloy.Globals.Events.trigger("tile_animation_open_complete", tileFlip.page);
            tileFlip.tile.open = true;
            tileFlip.node.remove(imageTileView);
            tileFlip.node.opacity = 0;
            tileFlip.tile.open = true;

            // onComplete
            if (tileFlip.onComplete) {
                tileFlip.onComplete();
            }
        })
	}
})

module.exports = TileFlip;