
/**
* Directive checkboxGroup
*
*/
angular
    .module('myob')
    .directive('checkboxGroup', checkboxGroupFactory);

function checkboxGroupFactory() {
    /* implementation details */
    var directive = {
        template: '<div class="myob-component-checkbox-group form-group"> <label ng-hide="info.hideLabel">{{info.elementLabel}}</label> <div ng-repeat="item in info.items" class="checkbox"> <input id="{{item.id}}" type="checkbox" name="{{info.elementName}}" value="{{item.value}}"  ng-model="value" ng-checked="{{item.checked}}" ng-required="info.required" class="sr-only"/> <label for="{{item.id}}">{{item.text}}</label> </div><div ng-messages="form[info.elementName].$error" ng-show="form[info.elementName].$touched" role="alert" class="help-block"> <p ng-message="required">{{info.errorMessage}}</p></div></div>',
        restrict: 'EA',
        scope: {
            info: '=',
            form: '='
        },
        replace: true
    };
    return directive;
}
