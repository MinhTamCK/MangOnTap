// /**
//  *  @name plugin sort table
//  *  @description auto sort for table
//  *  @version 1.0
//  *  @options
//  *    option
//  *  @events
//  *    event
//  *  @methods
//  *    init
//  *    destroy
//  */
// ;(function($, window, undefined) {
//   'use strict';

//   var pluginName = 'sort-table';
//   var source = $('#template-table').html();
//   var template =


//   function Plugin(element, options) {
//     this.element = $(element);
//     this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
//     this.init();
//   }

//   Plugin.prototype = {
//     init: function() {
//       var that = this,
//         el = that.element;
//       var thList = el.find('th');
//       // Get list tr tag
//       var trList = el.find('tbody tr');
//       // Get data follow sort
//       var dataTable = [];
//       thList.each(function(index) {
//         dataTable[index] = [];
//         trList.each(function(i, elTr) {
//           $(elTr).find('td').each(function(j, elTd) {
//             if(index === j)
//             {
//               dataTable[index].push($(elTd).text());
//             }
//           });
//         });
//       });
//       console.log(dataTable);
//     },
//     destroy: function() {
//       // remove events
//       // deinitialize
//       $.removeData(this.element[0], pluginName);
//     }
//   };

//   $.fn[pluginName] = function(options, params) {
//     return this.each(function() {
//       var instance = $.data(this, pluginName);
//       if (!instance) {
//         $.data(this, pluginName, new Plugin(this, options));
//       } else if (instance[options]) {
//         instance[options](params);
//       }
//     });
//   };

//   $.fn[pluginName].defaults = {};

//   $(function() {
//     $('[data-' + pluginName + ']')[pluginName]();
//   });

// }(jQuery, window));
