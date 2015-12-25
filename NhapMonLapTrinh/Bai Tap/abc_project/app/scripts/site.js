/**
 * @name Site
 * @description Global variables and functions
 * @version 1.0
 */

// Defined Language
L10n = L10n.france;

/**
 * Add method validation white spaces
 */
$.validator.addMethod('noSpace', function(value, element) {
  return $.trim(value) !== '';
});

var searchFormValidation = (function($, window, undefined) {
  'use strict';

  var messageError = L10n.searchForm;
  var searchFormValidation = function() {
    $('#search-form').validate({
      errorElement: 'span',
      errorClass: 'error-message',
      rules: {
        'search_top': {
          required: true,
          noSpace: true
        }
      },
      errorPlacement: function(error, element) {
        if (element.attr('id') === 'search_top') {
          element.parents().eq(1).append(error);
        }
      },
      messages: messageError
    });
  };
  return {
    searchFormValidation: searchFormValidation
  };

})(jQuery, window);

jQuery(function() {
  searchFormValidation.searchFormValidation();
});


var observation = (function($, window, undefined) {
  'use strict';

  var messageError = L10n.observationForm;

  var observationValidation = function() {
    $('#frm-observation').validate({
      errorElement: 'span',
      errorClass: 'error-message',
      rules: {
        'etes': 'required',
        'gender': 'required',
        'last-name': {
          required: true,
          noSpace: true
        },
        'first-name': {
          required: true,
          noSpace: true
        },
        'career': {
          required: true,
          noSpace: true
        },
        'your-email': {
          required: true,
          email: true,
          noSpace: true
        },
        'nature-advice': 'required',
        'observation-message': {
          required: true,
          maxlength: 3000,
          noSpace: true
        },
      },
      errorPlacement: function(error, element) {
        if (element.attr('name') === 'etes' || element.attr('name') === 'nature-advice') {
          element.parents().eq(1).append(error);
        } else {
          error.insertAfter(element);
        }
      },
      messages: messageError
    });
  };

  var beforeHideObservationFrm = function() {
    $('#form-observation').on('hide.bs.collapse', function() {
      $("html, body").animate({
        scrollTop: 0
      }, "fast");
    });
  };

  var hideMessage = function(){
    $('#open-form').on('click',function(event) {
      $('[data-close-message]')
      .find('a[title="close"]')
      .trigger('click');
    });
  };

  return {
    observationValidation: observationValidation,
    beforeHideObservationFrm: beforeHideObservationFrm
  };

})(jQuery, window);

jQuery(function() {
  observation.observationValidation();
  observation.beforeHideObservationFrm();
});


var searchHelpValidation = (function($, window, undefined) {
  'use strict';

  var messageError = L10n.helpForm;
  var searchHelpValidation = function() {
    $('#search-help').validate({
      errorElement: 'span',
      errorClass: 'error-message',
      rules: {
        'input-search-help': {
          required: true,
          noSpace: true
        }
      },
      errorPlacement: function(error, element) {
        if (element.attr('id') === 'input-search-help') {
          element.parents().eq(1).append(error);
        }
      },
      messages: messageError
    });
  };
  return {
    searchHelpValidation: searchHelpValidation
  };

})(jQuery, window);

jQuery(function() {
  searchHelpValidation.searchHelpValidation();
});
