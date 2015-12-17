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
  var $listDownload = $('#list-file');
  var $checkBoxList = $('#list-doc').find('input[type="checkbox"]');
  var $modeDownload = $('input[name="document-download"]');
  var arrayFile = [];

  var setCurrentDownload = function(aTag) {
    var $radioCurrentDownload = $('#document-cours');
    if (!$radioCurrentDownload.is('.checked')) {
      $radioCurrentDownload.prop('checked', 'true');
      $modeDownload.val(0);
    }
    // Set file name
    var infoPdf = getInfoPDFSelecting();
    var $radioCustom = $radioCurrentDownload.parents('.radio-custom');
    if (null !== infoPdf) {
      $radioCustom.find('.content').text(infoPdf.fileName);
      $radioCustom.find('.title').text(infoPdf.title);
    }
    arrayFile = [];
    arrayFile.push(aTag.attr('data-download'));
    $listDownload.val(JSON.stringify(arrayFile));
  };

  var getInfoPDFSelecting = function() {
    var infoPdf = {};
    $checkBoxList.each(function() {
      var $checkBox = $(this);
      if ($checkBox.is(':checked')) {
        var $liTag = $checkBox.parents('li');
        infoPdf.title = $liTag.find('.title-4').text();
        infoPdf.fileName = $checkBox.parents('.checkbox-custom')
        .find('a[data-render-pdf]')
        .text();
        return false;
      }
    });
    return infoPdf;
  };

  var countChecked = function() {
    var count = 0;
    $checkBoxList.each(function() {
      var $checkbox = $(this);
      if ($checkbox.is(':checked')) {
        count++;
      }
    });
    return count;
  };

  var setDownloadAll = function() {
    $modeDownload.val(1);
    arrayFile = [];
    $('a[data-render-pdf]').each(function() {
      arrayFile.push($(this).attr('data-download'));
    });
    var $radioDownloadAll = $('#all-document');
    if (!$radioDownloadAll.is('.checked')) {
      $radioDownloadAll.prop('checked', 'true');
      $modeDownload.val(1);
    }
    $listDownload.val(JSON.stringify(arrayFile));
  };

  var setMutileDownload = function() {
    arrayFile = [];
    $checkBoxList.each(function() {
      var $checkBox = $(this);
      if ($checkBox.is(':checked')) {
        var $checkboxCustom = $checkBox.parents('.checkbox-custom');
        var $aTag = $checkboxCustom.find('a[data-render-pdf]');
        arrayFile.push($aTag.attr('data-download'));
      }
    });
    var $radioMutileDownload = $('#document-selection');
    if (!$radioMutileDownload.is('.checked')) {
      $radioMutileDownload.prop('checked', 'true');
      $modeDownload.val(1);
    }
    $listDownload.val(JSON.stringify(arrayFile));
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
        $groupCheckbox = el.parents('.group-checkbox');
      // At click on checkbox
      el.on('click', function() {
        $('#download-list').collapse('show');
        var aTag = $groupCheckbox.find('a[data-render-pdf]');
        aTag.trigger('click');
        // Add item to list download
        var count = countChecked();
        var len = $checkBoxList.length;
        if (1 < count) {
          if (count !== len) {
            setMutileDownload();
          } else if (count === len) {
            setDownloadAll();
          }
        } else {
          setCurrentDownload(aTag);
        }
      });
      // At click download all document
      $('#all-document').on('click', function() {
        setDownloadAll();
      });
      // At click download mutile document
      $('#document-selection').on('click', function() {
        $modeDownload.val(1);
        setMutileDownload();
      });
      // At click download current document
      $('#document-cours').on('click', function() {
        $modeDownload.val(0);
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
