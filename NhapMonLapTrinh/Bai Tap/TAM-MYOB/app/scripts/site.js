/**
 * @name Site
 * @description Global variables and functions
 * @version 1.0
 */

var Site = (function($, window, fakewaffle) {
    'use strict';

    var minSmallScreen = 768; // break point small screen

    /**
     * init ResponsiveTabs
     */
    var initResponsiveTabs = function() {
        fakewaffle.responsiveTabs(['xs', 'sm']);
    };

    return {
        minSmallScreen: minSmallScreen,
        initResponsiveTabs: initResponsiveTabs
    };
})(jQuery, window, fakewaffle);

jQuery(function() {
    Site.initResponsiveTabs();
});
