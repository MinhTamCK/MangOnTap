/**
 *  @name plugin collapse page
 *  @description hide and shown content
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

  var pluginName = 'collapse-page';
  var flagShow = false;

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
        el = that.element,
        aidElement = el.find('p'),
        aidText = el.find('p').text();
      // Check length text > 200
      if (aidText.length > 200) {
        var aidSubText = aidText.substring(0, 198) + '...';
        aidElement.text(aidSubText);
        el.find('a').on('click', function(event) {
          event.preventDefault();
          if (!flagShow) {
            aidElement.text(aidText);
            flagShow = true;
          } else {
            aidElement.text(aidSubText);
            flagShow = false;
          }
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
  });

}(jQuery, window));
