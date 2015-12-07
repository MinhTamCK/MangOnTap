/**
 *  @name plugin ajax question
 *  @description update increases the number question
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

  var pluginName = 'ajax-question';

  var updateStatusQuestion = function(params) {
    $.ajax({
      url: base_url,
      type: 'POST',
      dataType: 'JSON',
      data: {
        nid: params.nid,
        count: params.count
      },
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
        options = that.options.ajaxQuestion;
      var params = {
        nid: options,
        count: ''
      };
      el.find('#yes').on('click', function() {
        // Call ajax update status +
        params.count = 1;
        updateStatusQuestion(params);
      });
      el.find('#no').on('click', function() {
        // Call ajax update status -
        params.count = 0;
        updateStatusQuestion(params);
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
