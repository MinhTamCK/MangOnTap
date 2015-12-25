/**
 *  @name plugin ajax question
 *  @description update increases the number question
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

  var pluginName = 'ajax-question';
  // Defined text when click button yes-no
  var statusYesText = '<p><strong>Merci de votre réponse</strong>&nbsp; Nous sommes ravi de vous avoir apporté satisfaction</p>';
  var statusNoText = ' <h3 class="panel-title">Votre question ne figure pas ici ?</h3><div class="panel-body"><a href="#" title="Envoyer-nous votre question via le formulaire de contact" class="btn btn-icon link-3"><span class="icon icon-right"></span>Envoyer-nous votre question via le formulaire de contact</a></div>';

  var updateStatusQuestion = function(params, areaQuestion) {
    var base_url = 'abc';
    $.ajax({
      url: base_url,
      type: 'POST',
      dataType: 'JSON',
      data: {
        nid: params.nid,
        count: params.count
      }
    }).done(function() {
      changeStatusQuestion(params.count, areaQuestion);
    });
  };

  var changeStatusQuestion = function(flagYesNo, areaQuestion) {
    // Reset class
    areaQuestion.removeClass('panel-1');
    if (flagYesNo) {
      areaQuestion.addClass('panel-2');
      areaQuestion.html(statusYesText);
    } else {
      areaQuestion.addClass('panel-2 text-center');
      areaQuestion.html(statusNoText);
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
        areaQuestion = el.parent(),
        options = that.options.ajaxQuestion;
      var params = {
        nid: options,
        count: ''
      };
      el.find('button[name="yes"]').on('click', function() {
        // Call ajax update status +
        params.count = 1;
        updateStatusQuestion(params, areaQuestion);
      });
      el.find('button[name="no"]').on('click', function() {
        // Call ajax update status -
        params.count = 0;
        updateStatusQuestion(params, areaQuestion);
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
