/**
 *  @name plugin alternative link
 *  @description alternative a element to link element
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    destroy
 */
;(function($, window) {
    'use strict';

    var pluginName = 'alternative-link';

    var openLink = function(options) {
        window.open(options.href, options.target);
    };

    var hasATagChildren = function($aList) {
        $aList.each(function() {
            var $aTag = $(this);
            $aTag.on('click', function(event) {
                event.stopPropagation();
            });
        });
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
                options = that.options.alternativeLink;

            // Check option not null
            if (null !== options) {
                // At click
                el.on('click', function() {
                    openLink(options);
                });
                // Add class
                el.addClass('myob-link-box');
                // Check children is a tag
                var $aList = el.find('a');
                hasATagChildren($aList);
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
    });

}(jQuery, window));
