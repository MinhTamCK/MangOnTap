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
      errorClass: 'error-message',
      rules: {
        'input-search': 'required',
      },
      errorPlacement: function(error, element) {
        if(element.attr('id') === 'input-search') {
          element.parent().append(error);
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
