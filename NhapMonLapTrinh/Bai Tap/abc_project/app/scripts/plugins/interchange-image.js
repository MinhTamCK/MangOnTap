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
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'interchange';
  var outerDims = {
    width: $(window).width()
  };
  var urlDefault = '';

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
      if (768 > outerDims.width) {
        imgSrc = options[0];
      } else if (768 <= outerDims.width && 1024 > outerDims.width) // Small devices Tablets
      {
        if (options.length > 2) {
          imgSrc = options[1];
        }
      } else if (1024 <= outerDims.width) //Medium devices
      {
        if (options.length === 2) {
          imgSrc = options[1];
        } else if (options.length === 3) {
          imgSrc = options[2];
        }
      }
    }
    return imgSrc;
  };

  var setDefault = function(element, options) {
    var imgSrc = getImage(options);
    if (element.is('img')) {
      if(urlDefault !== imgSrc)
      {
        element.attr('src', imgSrc);
        urlDefault = imgSrc;
      }
    } else {
      var backgroundImg = 'url(' + imgSrc + ')';
      if(urlDefault !== backgroundImg)
      {
        element.css('background-image', backgroundImg);
        urlDefault = backgroundImg;
      }
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
        options = that.options.interchange;
      // Call function defaut for element
      setDefault(el, options);
      // Set resize on screen
      $(window).on('resize', function() {
        outerDims.width = $(window).width();
        setDefault(el, options);
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
