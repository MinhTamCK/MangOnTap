/**
 *  @name plugin interchange image
 *  @description change image follow resize screen
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    destroy
 *    getImage
 *    setImage
 */
;(function($, window) {
    'use strict';

    var pluginName = 'interchange';
    var outerDims = {
        width: $(window).width()
    };

    /**
     * [getImage get path image]
     * @param  {[string]} options [string container array path]
     * @return {[string]}         [path source]
     */
    var getImage = function(options) {
        var imgSrc = '';
        var regularChar = new RegExp('\'', 'g');
        options = options.replace(regularChar, '');
        options = options.substring(1, options.length - 1);
        options = options.split(',');

        if (options != null && options.length > 0) {
            // Screen default
            imgSrc = options[0];
            // Extra small devices
            if (Site.minSmallScreen > outerDims.width) {
                imgSrc = options[0];
            } else if (Site.minSmallScreen <= outerDims.width) { // Small devices Tablets and Medium devices
                imgSrc = options[1];
            }
        }

        return imgSrc;
    };

    /**
     * [setImage set path image]
     * @param {[array]} element [jquery element]
     * @param {[string]} options [string container array path]
     */
    var setImage = function(element, options) {
        var imgSrc = getImage(options);

        if (element.is('img')) {
            var srcNow = element.attr('src');

            if (srcNow !== imgSrc) {
                element.attr('data-original', imgSrc);
                // Trigger lazyload
                element.lazyload();
            }
        } else {
            var backgroundImgNow = element.css('background-image');

            if (backgroundImgNow.indexOf(imgSrc) === -1) {
                var backgroundImg = 'url(' + imgSrc + ')';
                element.css('background-image', backgroundImg);
            }
        }
    };

    /**
     * [triggerBoostrapTab trigger lazyload when tab shown]
     */
    var triggerBoostrapTab = function() {
        $(window).trigger('scroll');
    };

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Plugin.prototype = {
        init: function() {
            var that = this,
                el = that.element,
                options = that.options.interchange;

            if ('string' === typeof options) {
                // Call function set image defaut for element
                setImage(el, options);
                // Set resize on screen
                $(window).on('resize', function() {
                    outerDims.width = $(window).width();
                    setImage(el, options);
                });
            }

        },

        destroy: function() {
            // remove events
            // deinitialize
            $.removeData(this.element[0], pluginName);
        }
    };

    $.fn[pluginName] = function(options, params) {
        return this.each(function() {
            var instance = $.data(this, pluginName);

            if (!instance) {
                $.data(this, pluginName, new Plugin(this, options));
            } else if (instance[options]) {
                instance[options](params);
            }
        });
    };

    $.fn[pluginName].defaults = {};

    $(function() {
        $('[data-' + pluginName + ']')[pluginName]();
        // Init trigger use image lazyload in tab
        $('a[data-toggle="tab"]').on('shown.bs.tab', function () {
            triggerBoostrapTab();
        });
    });

}(jQuery, window));
