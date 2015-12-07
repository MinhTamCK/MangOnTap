/**
 *  @name plugin sort table
 *  @description auto sort for table
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

  var pluginName = 'sort-table';
  var igListTemp = {
    'listIG': []
  };
  var templateDesktop = '{{#each listIG}}<tr><td>{{#if link.pub_inquiry_open_date}}<a href="{{link.url}}" title="{{link.title}}" class="title">{{link.text}}</a>{{else}}<a href="{{link.url}}" title="{{link.title}}" class="title grey">{{link.text}}</a>{{/if}}</td><td>{{date}}</td></tr>{{/each}}';
  var templateDesktopDetail = '{{#each listIG}}<tr><td><a href="{{link.url}}" title="{{link.title}}" class="title">{{link.text}}</a></td><td>{{date}}</td><td>{{num}}</td></tr>{{/each}}';
  var templateMobile = '{{#each listIG}}<div class="items"><div class="item"><div class="col-left">{{titleName}}</div><div class="col-right"><a href="{{link.url}}" title="{{link.title}}" class="title grey">{{link.text}}</a></div></div><div class="item"><div class="col-left">{{titleDate}}</div><div class="col-right">{{date}}</div></div></div>{{/each}}';
  var templateMobileDetail = '{{#each listIG}}<div class="items"><div class="item"><div class="col-left">{{titleName}}</div><div class="col-right"><a href="{{link.url}}" title="{{link.title}}" class="title">{{link.text}}</a></div></div><div class="item"><div class="col-left">{{titleDate}}</div><div class="col-right">{{date}}</div></div><div class="item"><div class="col-left">{{titleNum}}</div><div class="col-right">{{num}}</div></div></div>{{/each}}';

  var reLoadTable = function reLoadTable(tbody, dataSource, modelDetail) {
    // Change html for table desktop
    var templateTable = '';
    if (modelDetail) {
      templateTable = Handlebars.compile(templateDesktopDetail);
    } else {
      templateTable = Handlebars.compile(templateDesktop);
    }
    var htmlTable = templateTable(dataSource);
    tbody.html(htmlTable);
  };

  var reloadMobile = function reloadMobile(element, dataSource, modelDetail) {
    // Change html for table mobile
    var templateTableMobile = '';
    if (modelDetail) {
      templateTableMobile = Handlebars.compile(templateMobileDetail);
    } else {
      templateTableMobile = Handlebars.compile(templateMobile);
    }
    var htmlMobile = templateTableMobile(dataSource);
    element.html(htmlMobile);
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

  var getDataTable = function(tableDesktop, dataSource, tableMobile, modelDetail) {
    // Reset list empty
    igListTemp.listIG = [];
    tableDesktop.find('tbody tr').each(function() {
      var trTag = $(this);
      if (null != dataSource && 0 < dataSource.listIG.length) {
        var text = trTag.find('td').eq(0).find('a').text();
        var date = trTag.find('td').eq(1).text();
        for (var i = 0, len = dataSource.listIG.length; i < len; i++) {
          if (text === dataSource.listIG[i].link.text && date === dataSource.listIG[i].date) {
            igListTemp.listIG.push(dataSource.listIG[i]);
            break;
          }
        }
      }
    });
    reloadMobile(tableMobile, igListTemp, modelDetail);
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
        dataSource = that.options.sortTable,
        modelDetail = (typeof that.options.sortTable['mode-detail'] === 'undefined') ? false : that.options.sortTable['mode-detail'];

      var tableDesktop = el.find('.table');
      var tableMobile = el.find('.table-mobile');
      var tbody = tableDesktop.find('tbody'),
        thList = tableDesktop.find('th');
      // Init data table
      reLoadTable(tbody, dataSource, modelDetail);
      reloadMobile(tableMobile, dataSource, modelDetail);
      // Sort table
      tableDesktop.tablesorter();
      tableDesktop.bind('sortEnd', function() {
        getDataTable(tableDesktop, dataSource, tableMobile, modelDetail);
      });
      // Handle on click button sort
      thList.each(function(index) {
        $(this).find('a').on('click', function() {
          var btnSort = $(this);
          if (btnSort.hasClass('asc-sort')) {
            btnSort.removeClass('asc-sort');
            btnSort.addClass('des-sort');
          } else {
            btnSort.removeClass('des-sort');
            btnSort.addClass('asc-sort');
          }
          resetClassSort(index, thList);
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
