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

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
        el = that.element,
        $aidElement = el.find('.content');
      // Check length text > 200
      var htmlContent = $aidElement.html();
      var len = 0,
        aidSubText = '',
        subHtmlContent = ''; // text length,text temp,sub html of content
      var tagName = '',
        flagShow = false;
      $aidElement.children().each(function() {
        var item = $(this);
        var aidText = item.text();
        if (aidText.length > 200) {
          // Process remove
          aidSubText = aidText.substring(0, 198) + '...';
          item.text(aidSubText);
          // Remove item except item current
          tagName = item.prop('tagName').toLowerCase();
          subHtmlContent += '<' + tagName + '>' + item.clone().html() + '</' + tagName + '>';
          len = aidText.length;
          return false;
        } else {
          len += aidText.length;
          if (len > 200) {
            // Process remove
            aidSubText = aidText.substring(0, 198) + '...';
            item.text(aidSubText);
            // Remove item except item current
            tagName = item.prop('tagName').toLowerCase();
            subHtmlContent += '<' + tagName + '>' + item.clone().html() + '</' + tagName + '>';
            return false;
          }
          // Add get html item
          tagName = item.prop('tagName').toLowerCase();
          subHtmlContent += '<' + tagName + '>' + item.clone().html() + '</' + tagName + '>';
        }
      });
      if (200 > len) {
        el.find('a').remove();
      } else {
        // Remove item in content
        $aidElement.empty();
        $aidElement.html(subHtmlContent);
      }

      el.find('a').on('click', function(event) {
        event.preventDefault();
        if (!flagShow) {
          $aidElement.html(htmlContent);
          flagShow = true;
        } else {
          $aidElement.html(subHtmlContent);
          flagShow = false;
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
