/**
 *  @name plugin handle enter page
 *  @description handle change page when submit form pagination
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

  var pluginName = 'ajax-table';
  var url = '';
  var urlTemp = '';
  var currentPage = 0;
  var order = '';
  var sort = '';
  var pageList = {};
  var modeDetailPage = false;

  var setCurrenPage = function(element) {
    element.find('input[name="inp-pagination"]').val(currentPage);
  };

  var handleEnterPage = function handleEnterPage(form, totalNumber, tbody, tableMobile, element) {
    form.submit(function(event) {
      event.preventDefault();
      // Conver string -> number
      var page = parseInt($(this).find('input[name="inp-pagination"]').val());
      if (!checkFormValid(page, totalNumber)) {
        // Reload page number previously
        if (modeDetailPage) {
          changePage(currentPage);
        } else {
          ajaxGetTable(tbody, tableMobile);
          setCurrenPage(element);
          checkDisableButton(element, totalNumber);
        }
        return;
      }
      // Change page
      currentPage = page;
      if (modeDetailPage) {
        changePage(currentPage);
      } else {
        // Call ajax get table
        order = '';
        sort = '';
        ajaxGetTable(tbody, tableMobile);
        setCurrenPage(element);
        checkDisableButton(element, totalNumber);
      }
    });
  };

  var ajaxGetTable = function ajaxGetTable(tbody, tableMobile) {
    if (urlTemp.indexOf('asc') !== -1 || urlTemp.indexOf('desc') !== -1) {
      var temp = urlTemp.split('/');
      var len = temp.length;
      temp[len - 3] = currentPage;
      if (order !== '') {
        temp[len - 2] = order;
      }
      if (sort !== '') {
        temp[len - 1] = sort;
      }
      urlTemp = temp.join('/');
    } else {
      urlTemp = url + currentPage;
      if (order !== '') {
        urlTemp += '/' + order;
      }
      if (sort !== '') {
        urlTemp += '/' + sort;
      }
    }
    $.ajax({
        url: urlTemp,
        type: 'GET',
        beforeSend: function() {
          showLoading();
        }
      })
      .done(function(success) {
        tbody.html(success['results-desktop']);
        tableMobile.html(success['results-mobile']);
        hideLoading();
      })
      .always(function() {
        hideLoading();
      });
  };

  var showLoading = function showLoading() {
    $('.loadding').removeClass('hidden');
  };

  var hideLoading = function hideLoading() {
    $('.loadding').addClass('hidden');
  };

  var checkDisableButton = function checkDisableButton(element, totalNumber) {
    var btnPrevious = element.find('a[title="previous"]');
    var btnNext = element.find('a[title="next"]');
    var btnPreviousFirstPage = element.find('a[title="previous-page"]');
    var btnNextLastPage = element.find('a[title="next-page"]');
    if (currentPage === 1) {
      btnPrevious.each(function() {
        $(this).addClass('disabled');
      });
      btnPreviousFirstPage.each(function() {
        $(this).addClass('disabled');
      });
    } else {
      btnPrevious.each(function() {
        var btnItem = $(this);
        if (btnItem.hasClass('disabled')) {
          btnItem.removeClass('disabled');
        }
      });
      btnPreviousFirstPage.each(function() {
        var btnItem = $(this);
        if (btnItem.hasClass('disabled')) {
          btnItem.removeClass('disabled');
        }
      });
    }

    if (currentPage === totalNumber) {
      btnNext.each(function() {
        $(this).addClass('disabled');
      });
      btnNextLastPage.each(function() {
        $(this).addClass('disabled');
      });
    } else {
      btnNext.each(function() {
        var btnItem = $(this);
        if (btnItem.hasClass('disabled')) {
          btnItem.removeClass('disabled');
        }
      });
      btnNextLastPage.each(function() {
        var btnItem = $(this);
        if (btnItem.hasClass('disabled')) {
          btnItem.removeClass('disabled');
        }
      });
    }
  };

  var checkFormValid = function checkFormValid(page, totalNumber) {
    if (!$.isNumeric(page)) {
      return false;
    }
    if (1 > page || page > totalNumber) {
      return false;
    }
    return true;
  };

  var resetClassSort = function resetClassSort(index, thTagList) {
    thTagList.each(function(i, el) {
      var element = $(el).find('a');
      if (i === index) {
        return true;
      } else {
        if (element.hasClass('asc-sort')) {
          element.removeClass('asc-sort');
        }
        if (element.hasClass('des-sort')) {
          element.removeClass('des-sort');
        }
      }
    });
  };
  var getOrderPage = function getOrderPage(sortType, page, tbody, tableMobile, el, totalNumber) {
    sort = sortType;
    order = page;
    currentPage = 1;
    ajaxGetTable(tbody, tableMobile);
    setCurrenPage(el);
    checkDisableButton(el, totalNumber);
  };

  var changePage = function(currentPage) {
    var navigationUrl = '';
    for (var i = 0, len = pageList.length; i < len; i++) {
      pageList[i].page = parseInt(pageList[i].page);
      if (pageList[i].page === currentPage) {
        navigationUrl = base_url + pageList[i].id;
        break;
      }
    }
    window.location.href = navigationUrl;
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
        options = that.options,
        tbody = el.find('tbody'),
        tableMobile = el.find('.table-mobile');
      // Init data
      if (null != options.ajaxTable.pageList && options.ajaxTable.pageList.length > 0) {
        pageList = options.ajaxTable.pageList;
        modeDetailPage = true;
      } else {
        url = options.ajaxTable;
      }
      //Get current page
      currentPage = parseInt(el.find('#inp-pagination').val());
      if (!$.isNumeric(currentPage)) {
        currentPage = 0;
      }
      // Handele enter page
      var formPage = el.find('.form-pagination');
      var totalNumber = parseInt(el.find('.total-number').first().text());
      if (!$.isNumeric(totalNumber)) {
        totalNumber = 0;
      }
      handleEnterPage(formPage, totalNumber, tbody, tableMobile, el);
      // Previous page
      el.find('a[title="previous"]').on('click', function(event) {
        event.preventDefault();
        order = '';
        sort = '';
        if (currentPage > totalNumber) {
          currentPage = totalNumber;
        } else if (currentPage <= 1) {
          currentPage = 1;
        } else {
          currentPage--;
        }
        if (modeDetailPage) {
          changePage(currentPage);
        } else {
          // Call ajax get table
          ajaxGetTable(tbody, tableMobile);
          setCurrenPage(el);
          checkDisableButton(el, totalNumber);
        }

      });
      // previous page first
      el.find('a[title="previous-page"]').on('click', function(event) {
        event.preventDefault();
        order = '';
        sort = '';
        // Call ajax get table
        currentPage = 1;
        if (modeDetailPage) {
          changePage(currentPage);
        } else {
          // Call ajax get table
          ajaxGetTable(tbody, tableMobile);
          setCurrenPage(el);
          checkDisableButton(el, totalNumber);
          $(this).addClass('disabled');
        }

      });
      // Next button
      el.find('a[title="next"]').on('click', function(event) {
        event.preventDefault();
        order = '';
        sort = '';
        if (currentPage >= totalNumber) {
          currentPage = totalNumber;
        } else if (currentPage < 1) {
          currentPage = 1;
        } else {
          currentPage++;
        }
        if (modeDetailPage) {
          changePage(currentPage);
        } else {
          // Call ajax get table
          ajaxGetTable(tbody, tableMobile);
          setCurrenPage(el);
          checkDisableButton(el, totalNumber);
        }

      });
      // Next page last
      el.find('a[title="next-page"]').on('click', function(event) {
        event.preventDefault();
        order = '';
        sort = '';
        // Call ajax get table
        currentPage = totalNumber;
        if (modeDetailPage) {
          changePage(currentPage);
        } else {
          // Call ajax get table
          ajaxGetTable(tbody, tableMobile);
          setCurrenPage(el);
          checkDisableButton(el, totalNumber);
          $(this).addClass('disabled');
        }

      });
      // Handele order
      if (!modeDetailPage) {
        el.find('thead th').each(function(index, element) {
          $(element).find('a').on('click', function() {
            var order = $(this);
            var sortType = '';
            if (order.hasClass('asc-sort')) {
              order.removeClass('asc-sort');
              order.addClass('des-sort');
              sortType = 'desc';
            } else {
              order.removeClass('des-sort');
              order.addClass('asc-sort');
              sortType = 'asc';
            }
            resetClassSort(index, el.find('thead th'));
            getOrderPage(sortType, index, tbody, tableMobile, el, totalNumber);
          });
        });
      }
      // Handle check disable button
      if (modeDetailPage) {
        $(window).load(function() {
          checkDisableButton(el, totalNumber);
        });
      }
      // Not allow input character
      el.find('input[name="inp-pagination"]').on('keydown', function(event) {
        if (event.shiftKey) {
          return false;
        }
        var keyCode = event.which;
        if (!((keyCode > 47 && keyCode < 58) || (keyCode > 95 && keyCode < 106) || keyCode === 08)) {
          if(keyCode === 13 ||keyCode === 37 || keyCode === 39)
          {
          }else{
            event.preventDefault();
          }
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
