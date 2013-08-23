// ----------------------------------------------- imports

var Alloy = require("alloy");
var _ = require("alloy/underscore");
var Declare = require('tui/base/Declare');
var AnimateBase = require("tui/animation/AnimateBase");
var animate = require("tui/animation/Animate");

// ----------------------------------------------- class

var TileZoomin = Declare({
	
	extends : AnimateBase,

	animate : function(options){

        var tileZoomin = this;

        tileZoomin._super(options);
                                     //(tileZoomin.settings)
        if (!tileZoomin.node) return;

        // convert tile to an image
        var imgTile = tileZoomin.node.toImage();

        var imageTileView = Ti.UI.createImageView({
            image : imgTile,
            width : Ti.UI.FILL,
            height : Ti.UI.FILL
        });

        imageTileView.animate({
            opacity : 0,
            delay : tileZoomin.settings.animSpeed / 4,
            duration : tileZoomin.settings.animSpeed / 4 
        });

        tileZoomin.mask.animate({
            backgroundColor : "#fff",
            duration : 0,
            opacity : 1,
            delay : tileZoomin.settings.animSpeed / 2
        });

        tileZoomin.node.add(imageTileView);
        tileZoomin.node.zIndex  = 100;
        tileZoomin.innerTileView.opacity = 0;

        tileZoomin.node.animate({
            width : Alloy.Globals.Styles.page.width,
            height : Alloy.Globals.Styles.page.height,
            top : Alloy.Globals.Styles.template.homeContentOffset + Alloy.Globals.Styles.page.top,
            left : Alloy.Globals.Styles.page.left,
            delay : tileZoomin.settings.animSpeed / 2,
            duration : tileZoomin.settings.animSpeed,
            curve : tileZoomin.settings.curve

        }, function(){

            // onBeforeComplete
            if (tileZoomin.onBeforeComplete) {
                tileZoomin.onBeforeComplete();
            }

            Alloy.Globals.Events.trigger("tile_animation_open_complete", tileZoomin.page);
            tileZoomin.tile.open = true;
            tileZoomin.node.remove(imageTileView);
            tileZoomin.node.opacity = 0;
            tileZoomin.tile.open = true;

            // onComplete
            if (tileZoomin.onComplete) {
                tileZoomin.onComplete();
            }
        })
	}
})

module.exports = TileZoomin;