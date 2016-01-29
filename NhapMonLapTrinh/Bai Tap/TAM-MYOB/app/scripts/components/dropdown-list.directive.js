/**
 * Directive Dropdown List
 *
 */
angular
    .module('myob')
    .directive('dropdownList', dropdownListFactory);

function dropdownListFactory() {
    /* implementation details */
    var directive = {
        template: '<div class="myob-component-dropdown-list form-group"> <div class="form-group"> <label for={{info.id}} ng-hide=info.hideLabel>{{info.elementLabel}}</label> <select id={{info.id}} name={{info.elementName}} ng-model="value" ng-required={{info.required}} ng-options="item as item.text for item in info.items" class="form-control"></select> <div ng-messages="form[info.elementName].$error" ng-show="form[info.elementName].$touched" role="alert" class="help-block"><p ng-message="required">{{info.errorMessage}}requered</p></div></div></div>',
        restrict: 'EA',
        scope: {
            value: '=',
            info: '='
        },
        replace: true,
        link: link
    };
    return directive;

    function link(scope) {
        scope.value = scope.info.items[scope.info.selected];
    }
}
