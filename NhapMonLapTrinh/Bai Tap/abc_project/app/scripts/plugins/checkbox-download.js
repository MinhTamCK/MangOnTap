/**
 *  @name plugin checkbox download
 *  @description when click on check box then show area download
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

  var pluginName = 'checkbox-download';
  var listDownload = $('#list-file');
  var arrayFile = [];

  var setCurrentDownload = function(url)
  {
    arrayFile = [];
    arrayFile.push(url);
    listDownload.val(arrayFile);
  };

  var setDownloadAll = function()
  {
    arrayFile = [];
    $('a[data-render-pdf]').each(function() {
      arrayFile.push($(this).attr('data-render-pdf'));
    });
     listDownload.val(arrayFile);
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
        groupCheckbox = el.parents('div .group-checkbox');
      // At click on checkbox
      el.on('click', function() {
        $('#download-list').collapse('show');
        var aTag = groupCheckbox.find('a[data-render-pdf]');
        aTag.trigger('click');
        // Add item to list download
        setCurrentDownload(aTag.attr('data-render-pdf'));
      });
      // At click download all document
      $('#all-document').on('click',function() {
        $('#all-document').val(1);
        setDownloadAll();
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
