/**
 *  @name plugin render pdf
 *  @description use render file pdf
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

  var pluginName = 'render-pdf';
  var iframeDocuments = $('#iframe-documents');
  var pdfList = $('a[data-render-pdf]');
  var urlView = iframeDocuments.attr('src');
  var currenPage = -1;
  var totalPage = pdfList.length - 1;
  var iframeContents = iframeDocuments.contents();
  var previousPDF = '';
  var nextPDF = '';
  var downloadTablet = $('.viewer-sm a[title="download-file"]');

  var refreshActive = function() {
    pdfList.each(function() {
      var $active = $(this).parents('div .group-checkbox');
      if ($active.hasClass('active')) {
        $active.removeClass('active');
      }
    });
  };

  // Update content iframe.
  iframeDocuments.on('load', function() {
    iframeContents = iframeDocuments.contents();
    setNextPDFClick();
    setPreviousPDFClick();
    disableButton();
  });

  var changePage = function(page) {
    pdfList.each(function(index, el) {
      if (index === page) {
        $(el).trigger('click');
      }
    });
  };

  /**
   * Next PDF click
   */
  var setNextPDFClick = function() {
    iframeContents.find('#nextPDF').on('click', function() {
      if (0 > currenPage) {
        currenPage = 0;
      } else if (currenPage > totalPage) {
        currenPage = totalPage;
      } else {
        currenPage++;
      }
      changePage(currenPage);
    });

    iframeContents.find('#nextPDFBottom').on('click', function() {
      if (0 > currenPage) {
        currenPage = 0;
      } else if (currenPage > totalPage) {
        currenPage = totalPage;
      } else {
        currenPage++;
      }
      changePage(currenPage);
    });
  };

  /**
   * previous PDF click
   */
  var setPreviousPDFClick = function() {
    iframeContents.find('#previousPDF').on('click', function() {
      if (0 > currenPage) {
        currenPage = 0;
      } else if (currenPage > totalPage) {
        currenPage = totalPage;
      } else {
        currenPage--;
      }
      changePage(currenPage);
    });
    iframeContents.find('#previousPDFBottom').on('click', function() {
      if (0 > currenPage) {
        currenPage = 0;
      } else if (currenPage > totalPage) {
        currenPage = totalPage;
      } else {
        currenPage--;
      }
      changePage(currenPage);
    });
  };

  var getIndex = function(item) {
    var index = 0;
    if (null !== pdfList && pdfList.length > 0) {
      for (var i = 0; i <= totalPage; i++) {
        if ($(pdfList[i]).is(item)) {
          index = i;
          break;
        }
      }
    }
    return index;
  };

  var disableButton = function() {
    previousPDF = iframeContents.find('button[title="Previous PDF"]');
    nextPDF = iframeContents.find('button[title="Next PDF"]');
    if (0 >= currenPage) {
      previousPDF.each(function() {
        $(this).prop('disabled', 'true');
      });
    } else {
      previousPDF.each(function() {
        var item = $(this);
        if (item.prop('disabled')) {
          item.prop('disabled', 'false');
        }
      });
    }

    if (currenPage >= totalPage) {
      nextPDF.each(function() {
        $(this).prop('disabled', 'true');
      });
    } else {
      nextPDF.each(function() {
        var item = $(this);
        if (item.prop('disabled')) {
          item.prop('disabled', 'false');
        }
      });
    }
  };

  var setHref = function(downloadMobile,href)
  {
    // Set href for mobile
    downloadMobile.attr('href', href);
    // Set href for tablet
    downloadTablet.attr('href', href);
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
      el.on('click', function(event) {
        event.preventDefault();
        refreshActive();
        var src = urlView + '?file=' + options.renderPdf;
        iframeDocuments.attr('src', src);
        // Set active class item click
        var groupCheckbox = el.parents('div.group-checkbox');
        groupCheckbox.addClass('active');
        // Set current page
        currenPage = getIndex(el);
        // Set href download
        var downloadMobile = groupCheckbox.find('.download-file a[title="download-file"]');
        setHref(downloadMobile,options.renderPdf);
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
