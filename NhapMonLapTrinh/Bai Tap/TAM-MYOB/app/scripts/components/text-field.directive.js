
/**
* Directive Text Field
*
*/
angular
    .module('myob')
    .directive('textField', textFieldFactory);

function textFieldFactory() {
    /* implementation details */
    var directive = {
        template: '<div class="myob-component-text-field"> <div class="form-group"> <label for="{{info.id}}" ng-hide="info.hideLabel">{{info.elementLabel}}</label> <input id="{{info.id}}" type="{{info.type}}" name="{{info.elementName}}" placeholder="{{info.placeHolder}}" ng-model="value" ng-if="info.numberOfRows &lt;=1" ng-required="info.required" class="form-control"/> <textarea id="text-4" name="{{info.elementName}}" placeholder="{{info.placeHolder}}" rows="{{info.numberOfRows}}" ng-if="info.numberOfRows &gt; 1" ng-required="info.required" class="form-control" ng-model="value"></textarea> <div ng-messages="form[info.elementName].$error" ng-show="form[info.elementName].$touched" role="alert" class="help-block"> <p ng-message="email">{{info.errorMessage.email}}</p><p ng-message="required">{{info.errorMessage.required}}</p></div></div></div>',
        restrict: 'EA',
        scope: {
            info: '=',
            form: '='
        },
        replace: true,
    };
    return directive;

}
