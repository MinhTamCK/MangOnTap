/**
 *  @name plugin add file
 *  @description when click input file then add file into form
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

  var pluginName = 'add-file';
  var count = 0,$fileCustom = $('.file-custom');

  var addFile = function(fileName, ulTag, fileTemp) {
    count++;
    var htmlItem = '<li><div class="thumbnail thumbnail-1"><img src="/sites/all/themes/base_ig/images/icon-document-2.png" alt="File"><div class="caption"><p>' + fileName + '</p></div><button type="button" name="delete" id="delete" title="delete" class="btn btn-1 orange">Supprimer</button></div></li>';
    htmlItem = $(htmlItem);
    var $file = $('<input type="file" class="hidden"/>');
    $file.attr('name','files[fj'+count+']');
    $file[0].files = fileTemp;
    htmlItem.append($file);
    ulTag.append(htmlItem);
    // Set action remove item
    setActionRemoveItem(ulTag.find('li').last());
    // Max 5 file
    checkAddFile();
  };

  var checkAddFile = function()
  {
    if(count === 5)
    {
      $fileCustom.addClass('hidden');
    }else if(count < 5)
    {
      if($fileCustom.hasClass('hidden'))
      {
        $fileCustom.removeClass('hidden');
      }
    }
  };

  var setActionRemoveItem = function(li) {
    li.find('#delete').bind('click', function() {
      li.remove();
      count--;
      checkAddFile();
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
        ulTag = el.find('ul.list-file');
      el.find('#file-upload').change(function() {
        var file = $(this);
        var fileTemp = file[0].files;
        file = file.val();
        if (file) {
          // Add list file
          file = file.replace(/^.*[\\\/]/, '');
          addFile(file, ulTag, fileTemp);
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
