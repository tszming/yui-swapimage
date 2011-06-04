/**
 * SwapImage - YUI plugin for swapping image(s)
 *
 * Copyright (c) 2009 tszming (tszming@gmail.com)
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Enable image swapping, requires metadata plugin.
 *
 * @example YAHOO.plugin.SwapImage.bind(".swapImage");
 * @desc Enable image swapping for all images with CSS class name equal to "swapImage", e.g.
 *	<img class="swapImage {src: 'images/new.gif'}" src="images/old.gif" />
 *
 * All you need is to call the YAHOO.plugin.SwapImage.bind method, which contains the
 * parameters: (i, preload, repeat, swapInEvent, swapOutEvent)
 *
 * @param i Images to be selected.
 * @param preload Preload the image, default = true.
 * @param repeat Repeat the effect, default = true.
 * @param swapInEvent Event for swap In.
 * @param swapOutEvent Event for swap Out.
 *
 * @version 1.0.4
 */

(function() {

    var dom = YAHOO.util.Dom;
    var metadata = YAHOO.plugin.Metadata;

    YAHOO.namespace('plugin');

    YAHOO.plugin.SwapImage = {

        files: {},

        data: {},

        init: function() {
            var id = dom.generateId(this);
            var mdata = metadata.get(this);

            swapImage.data[id] = swapImage.data[id] || {};
            if (typeof mdata.src != "undefined") {
                swapImage.data[id]["src"] = mdata.src;
                swapImage.files[mdata.src] = false;
            }

            swapImage._each(swapImage._grep([[mdata.sin, "sin"], [mdata.sout, "sout"]],
            function(n) {
                return (typeof n[0] != "undefined" && n[0].length > 0);
            }),
            function() {
                var arr = this[0];
                var vname = this[1];
                for (var i = 0; i < arr.length; i++) {
                    var idx = mdata[vname][i].indexOf(":");
                    var selection = mdata[vname][i].substring(0, idx);
                    var file = mdata[vname][i].substring(idx + 1);
                    swapImage.data[id][vname] = swapImage.data[id][vname] || [];
                    if (idx > 1) {
                        swapImage.data[id][vname].push([selection, file]);
                        swapImage.files[file] = false;
                    } else {
                        swapImage.data[id][vname].push([file]);
                    }
                }
            });
        },

        preload: function() {
            swapImage._each(swapImage.files,
            function(k, v) {
                if (v == false) {
                    swapImage.files[k] = true;
                    var img = new Image();
                    img.src = k;
                }
            });
        },

        swapIn: function() {
            swapImage.swap(this, "sin");
        },

        swapOut: function() {
            swapImage.swap(this, "sout");
        },

        swap: function(obj, a) {
            var id = dom.generateId(obj);
            if (typeof swapImage.data[id][a] != "undefined") {
                for (var i = 0; i < swapImage.data[id][a].length; i++) {
                    var s = YAHOO.util.Selector.query(swapImage.data[id][a][i][0]);
                    if (swapImage.data[id][a][i].length > 1) {
                        swapImage._each(s,
                        function() {
                            this.src = swapImage.data[id][a][i][1];
                        });
                    } else {
                        swapImage._each(s, swapImage._swap);
                    }
                }
            } else {
                swapImage._swap.call(obj);
            }
        },

        _swap: function() {
            var id = dom.generateId(this);
            var data = swapImage.data[id];
            if (typeof data.src != "undefined") {
                var tmp = data.src;
                data.src = this.src;
                this.src = tmp;
            }
        },

        // From jQuery
        _each: function(object, callback) {
            var name, i = 0, length = object.length;
            if (length === undefined) {
                for (name in object)
                    if (callback.call(object[name], name, object[name]) === false) break;
            } else {
                for (var value = object[0];
                    i < length && callback.call(value, i, value) !== false; value = object[++i]) {}
            }
        },

        // From jQuery
        _grep: function(elems, callback, inv) {
            var ret = [];

            for (var i = 0, length = elems.length; i < length; i++)
                if (!inv != !callback(elems[i], i)) ret.push(elems[i]);

            return ret;
        },

        bind: function(i, preload, repeat, swapInEvent, swapOutEvent) {

            YAHOO.util.Event.onDOMReady(function() {

                if (typeof repeat == "undefined") {
                    repeat = true;
                }

                if (typeof preload == "undefined") {
                    preload = true;
                }

                var elem = YAHOO.util.Selector.query(i);
                swapImage._each(elem, swapImage.init);

                if (typeof swapInEvent == "undefined" && typeof swapInEvent == "undefined") {
                    swapInEvent = "mouseover";
                    swapOutEvent = "mouseout";
                }

                if (repeat) {
                    if (typeof swapOutEvent != "undefined") {
                        YAHOO.util.Event.addListener(elem, swapInEvent, swapImage.swapIn);
                        YAHOO.util.Event.addListener(elem, swapOutEvent, swapImage.swapOut);
                    } else {
                        YAHOO.util.Event.addListener(elem, swapInEvent, swapImage.swapIn);
                    }
                } else {
                    YAHOO.util.Event.addListener(elem, swapInEvent,
                    function() {
                        swapImage.swapIn.call(this);
                        YAHOO.util.Event.removeListener(elem, swapInEvent, null);
                    });
                }

                if (preload) {
                    swapImage._each(elem, swapImage.preload);
                }

            });
        }
    };

    var swapImage = YAHOO.plugin.SwapImage;

    YAHOO.register('YAHOO.plugin.SwapImage', YAHOO.plugin.SwapImage, {version: '1.0', build: '4'});

})();