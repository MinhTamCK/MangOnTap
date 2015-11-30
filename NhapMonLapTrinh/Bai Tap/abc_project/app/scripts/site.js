/**
 * @name Site
 * @description Global variables and functions
 * @version 1.0
 */

var searchFormValidation = (function($, window, undefined) {
  'use strict';

  var messageError = L10n.searchForm;
  var searchFormValidation = function() {
    $('#search-form').validate({
      errorElement: 'span',
      errorClass: 'error-message',
      rules: {
        'search_top': 'required',
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
        'enter-info': 'required',
        'gender': 'required',
        'last-name': 'required',
        'first-name': 'required',
        'career': 'required',
        'your-email': {
          required: true,
          email: true
        },
        'nature-advice': 'required',
        'observation-message': {
          required: true,
          maxlength: 3000
        },
      },
      errorPlacement: function(error, element) {
        if (element.attr('name') === 'enter-info' || element.attr('name') === 'nature-advice') {
          element.parents().eq(1).append(error);
        } else {
          error.insertAfter(element);
        }
      },
      messages: messageError
    });
  };

  var beforeHideObservationFrm = function()
  {
    $('#form-observation').on('hide.bs.collapse',function(){
      $("html, body").animate({ scrollTop: 0 }, "fast");
    });
  };

  return {
    observationValidation: observationValidation,
    beforeHideObservationFrm:beforeHideObservationFrm
  };

})(jQuery, window);

jQuery(function() {
  observation.observationValidation();
  observation.beforeHideObservationFrm();
});