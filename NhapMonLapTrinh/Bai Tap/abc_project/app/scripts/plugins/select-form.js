/**
 *  @name plugin select on form
 *  @description when click on button auto select show
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

  var pluginName = 'select-form';
  var flag = false; // Flag show option

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
        el = that.element,
        iconSelect = el.find('.select-control'),
        slectTag = el.find('select');
      // Handle click on icon select
      iconSelect.on('click', function() {
        if (!flag) {
          var eventMousedown = document.createEvent('MouseEvents');
          eventMousedown.initMouseEvent('mousedown', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          slectTag[0].dispatchEvent(eventMousedown);
          flag = true;
        } else {
          var eventMouseout = document.createEvent('MouseEvents');
          eventMouseout.initMouseEvent('mouseout', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          slectTag[0].dispatchEvent(eventMouseout);
          flag = false;
        }
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
