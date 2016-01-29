/**
 *  @name plugin store alert
 *  @description when click close alert then store configuration
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    destroy
 */
;(function($) {
    'use strict';

    var pluginName = 'store-alert';

    /**
     * [storeConfiguration use cookie save configuration alert]
     * @param  {[object]} options [info id and time life]
     * @return {none}
     */
    var storeConfiguration = function(options) {
        var cookieName = 'alert-' + options.storeAlert.id;
        var dayNumber = options.storeAlert.numday;
        $.cookie(cookieName, true, {
            expires: dayNumber
        });
    };

    /**
     * [checkHideAlert init check hide alert from cookie]
     * @param  {[object]} options [info id and time life]
     * @param {[array]} element [jquery element]
     * @return {none}
     */
    var checkHideAlert = function(options, element) {
        var cookieName = 'alert-' + options.storeAlert.id;

        if (!$.cookie(cookieName)) {
            element.show();
        }
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
                options = that.options;
            // Check show/hidden alert
            checkHideAlert(options, el);
            // Process click close button
            el.find('.close').on('click', function() {
                storeConfiguration(options);
            });
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

}(jQuery));
