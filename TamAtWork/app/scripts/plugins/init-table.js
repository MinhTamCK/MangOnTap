/**
 *  @name plugin table
 *  @description auto set width for table
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'table-width';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
        el = that.element,
        thTag = el.find('th'),
        trTag = el.find('tbody tr');

      // Set width for th tag
      thTag.each(function(i, elTh) {
        var $elTh = $(elTh);
        $elTh.css('width', $elTh.data('width'));
      });

      // Set width for td tag
      trTag.each(function(i, elTr) {
        $(elTr).find('td').each(function(j, elTd) {
          thTag.each(function(k, elTh) {
            if (j === k) {
              var $elTd = $(elTd);
              var $elTh = $(elTh);
              $elTd.css('width', $elTh.data('width'));
              return false;
            }
          });
        });
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

}(jQuery, window));
