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
  var templateDestop = '{{#each listIG}}<tr><td><a href="{{link.url}}" title="{{link.title}}" class="title grey">{{link.text}}</a></td><td>{{date}}</td></tr>{{/each}}';
  var tenplateMobile = '{{#each listIG}}<div class="items"><div class="item"><div class="col-left">{{titleName}}</div><div class="col-right"><a href="{{link.url}}" title="{{link.title}}" class="title grey">{{link.text}}</a></div></div><div class="item"> < div class = "col-left" > { {titleDate}} < /div> < div class = "col-right" > { {date}} < /div> < /div > < /div> { {/each}}';
  var outerDims = {
    width: $(window).width()
  };
  var dataTable = {
    'listIG': [{
      'titleName': '',
      'link': {
        'url': 'test',
        'title': '',
        'text': 'abc1'
      },
      'titleDate': '',
      'date': '12/1/2000'
    }, {
      'titleName': '',
      'link': {
        'url': 'test2',
        'title': '',
        'text': 'abc2'
      },
      'titleDate': '',
      'date': '12/1/1000'
    }]
  };

  var reLoadTable = function reLoadTable(tbody) {
    var template = '';
    var tbodyHtml = '';
    if (991 < outerDims.width) {
      template = Handlebars.compile(templateDestop);
    } else {
      template = Handlebars.compile(tenplateMobile);
    }
    tbodyHtml = template(dataTable);
    tbody.html(tbodyHtml);
  };

  $(window).on('resize', function() {
    outerDims.width = $(window).width();
  });

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options, dataTable);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
        el = that.element,
        tbody = el.find('tbody'),
        thList = el.find('th');

      thList.each(function() {
        // Handele on lick for button sort
        $(this).find('a').on('click', function() {
          var btnSort = $(this);
          if (btnSort.hasClass('asc-sort')) {
            dataTable.listIG.reverse();
            btnSort.removeClass('asc-sort');
          } else {
            dataTable.listIG.reverse();
            btnSort.addClass('asc-sort');
          }
          reLoadTable(tbody);
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
