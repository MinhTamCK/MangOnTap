/**
 *  @name plugin search call ajax
 *  @description when user search then call ajax show recommned
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

  var pluginName = 'ajax-search';
  var templateSearch = '<ul class="word-list list-unstyled">{{#each keyList}}<li>{{keyword}}</li>{{/each}}</ul>';
  var ulTag, inputSearch, wordBlock,form = '';

  var getSearchData = function(param, url) {
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'JSON',
        data: {
          keyword: param
        },
      })
      .done(function(data) {
        genderSearch(data);
      });
  };


  var genderSearch = function(keyList) {
    var templateProcress = Handlebars.compile(templateSearch);
    var htmlLi = templateProcress(keyList);
    // Gender html
    ulTag.html(htmlLi);
    if (wordBlock.hasClass('hidden')) {
      wordBlock.removeClass('hidden');
    }
    onClickKeyWord(ulTag.find('li'));
  };

  var onClickKeyWord = function(liTagList) {
    liTagList.on('click', function() {
      inputSearch.val($(this).text());
      if(!wordBlock.hasClass('hidden'))
      {
        wordBlock.addClass('hidden');
      }
      // Call submit form
      form.submit();
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
        url = that.options.ajaxSearch;
      ulTag = el.find('ul.word-list');
      wordBlock = ulTag.parent('div.word-block');
      inputSearch = el.find('#search_top');
      form = el;
      inputSearch.on('input', function() {
        var keyword = $(this).val();
        // Check length >= 2
        if (2 <= keyword.length) {
          getSearchData(keyword, url);
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

