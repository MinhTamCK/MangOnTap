/**
 *  @name plugin rebuild table
 *  @description auto rebuild table follow boostrap
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

    var pluginName = 'rebuild-table';

    /**
     * [customTable ]
     * @param  {[array]} table   [jquery element]
     * @param  {[object]} options [object container class ]
     * @return {none}
     */
    var customTable = function(table, options) {
        // Get tr first
        var trTag = table.find('tr').eq(0);
        // Add file
        table.addClass(options['table-class']);
        table.prepend('<thead></thead>');
        table.find('thead').append(trTag);
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
                options = that.options.rebuildTable,
                tableTag = el.find('table');
            // Custome table
            customTable(tableTag, options);
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
