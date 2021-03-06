(function($) {
	// base CSS file
	require("./src/interactive.less")

	// Modernizr tests
	require("browsernizr/test/svg");
	require("browsernizr/test/canvas");
	require("browsernizr/test/audio");
	require("browsernizr/test/geolocation");
	require("browsernizr/test/postmessage");
	require("browsernizr/test/websockets");
	require("browsernizr/test/touchevents");
	require("browsernizr/test/webgl");

	var Modernizr = require('browsernizr');

	// this assumes there is already a <div> on the page with the correct id, which Wordpress should have created (see README)
	module.exports = function(id, opts) {
		if (!id || typeof id !== "string") {
			console.log("Whoops -- you need to give time-interactive a string id of the element on the page in which to self-assemble.");
			return;
		}
		opts = opts || {};

		// make el, a $ object
		var sel = id[0] !== "#" ? ("#" + id) : id,
			$el = $(sel);

		if ($el.length === 0) {
			console.log("Whoops -- the time-interactive function couldn't find a <div> on this page with an id of '" + el + "'. You probably mistyped it in debug.js.");
			return;
		}

		// ought to already have this, but let's be sure
		$el.addClass("time-interactive");

		// remove the default screenshot placed by the short code unless you specify you want to keep
		if (!opts.keepScreenshot) {
			// remove screenshot
			$el.find(".screenshot").remove();	
		}

		// return the DOM object
		return {
			version: "0.0.3",
			id: id,
			el: $el.get(0),
			width: function() { return $el.width(); },
			height: function() { return $el.height(); },
			detections: Modernizr,
			onresize: function(f, delay) {
				delay = typeof delay === undefined ? 100 : delay;
				var resizeTimer;
				$(window).resize(function() { 
					clearTimeout(resizeTimer);
					resizeTimer = setTimeout(function() {				
						f($el.width(), $el.height());
					}, delay);
				});
			}
		};
	}


	/* CONVENIENCE FUNCTIONS */

	// add commas to numbers over 1000
	module.exports.commafy = function(val){
		if (typeof val !== "number") {
			return;
		}
		val = parseInt(val, 10);

	    while (/(\d+)(\d{3})/.test(val.toString())){
	      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
	    }
	    return val;
	}

	// generate a unique GUID
	module.exports.guid = function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		    return v.toString(16);
		});		
	}

}(jQuery));