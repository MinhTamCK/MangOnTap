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
  var templateDestop = '{{#each listIG}}<tr><td>{{#if link.pub_inquiry_open_date}}<a href="{{link.url}}" title="{{link.title}}" class="title">{{link.text}}</a>{{else}}<a href="{{link.url}}" title="{{link.title}}" class="title grey">{{link.text}}</a>{{/if}}</td><td>{{date}}</td></tr>{{/each}}';
  var templateMobile = '{{#each listIG}}<div class="items"><div class="item"><div class="col-left">{{titleName}}</div><div class="col-right"><a href="{{link.url}}" title="{{link.title}}" class="title grey">{{link.text}}</a></div></div><div class="item"><div class="col-left">{{titleDate}}</div><div class="col-right">{{date}}</div></div></div>{{/each}}';

  var reLoadTable = function reLoadTable(tbody, dataSource) {
    // Change html for table desktop
    var templateTable = Handlebars.compile(templateDestop);
    var htmlTable = templateTable(dataSource);
    tbody.html(htmlTable);
  };

  var reloadMobile = function reloadMobile(element, dataSource) {
    // Change html for table mobile
    var templateTableMobile = Handlebars.compile(templateMobile);
    var htmlMobile = templateTableMobile(dataSource);
    element.html(htmlMobile);
  };

  var resetClassSort = function resetClassSort(index,thTagList) {
    thTagList.each(function(i, el) {
      var element = $(el).find('a');
      if (i === index) {
        return true;
      } else {
        if (element.hasClass('asc-sort')) {
          element.removeClass('asc-sort');
        }
      }
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
        dataSource = that.options.sortTable;

      var tableDesktop = el.find('.table');
      var tableMobile = el.find('.table-mobile');
      var tbody = tableDesktop.find('tbody'),
        thList = tableDesktop.find('th');
      // Init data table
      reLoadTable(tbody, dataSource);
      reloadMobile(tableMobile, dataSource);
      // Handle on click button sort
      thList.each(function(index) {
        $(this).find('a').on('click', function() {
          var btnSort = $(this);
          if (btnSort.hasClass('asc-sort')) {
            btnSort.removeClass('asc-sort');
          } else {
            btnSort.addClass('asc-sort');
          }
          resetClassSort(index,thList);
          dataSource.listIG.reverse();
          reLoadTable(tbody, dataSource);
          reloadMobile(tableMobile, dataSource);
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
