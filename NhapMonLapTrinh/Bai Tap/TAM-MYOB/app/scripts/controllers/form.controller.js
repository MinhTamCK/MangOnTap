angular
    .module('myob')
    .controller('FormController', FormController);

// FormController.$inject = ['$http'];

function FormController($http) {
    var vm = this;
    vm.saveChanges = saveChanges;
    vm.saveForm = saveForm;

    // Defined function
    function saveChanges(form, event) {
        if (form.$valid) {
            // Call ajax
            // var param = {
            //     data: ''
            // };
            console.log($http);
            console.log(event);
            event.preventDefault();
        } else {
            alert('alert error');
        }
    }

    function saveForm(element) {
        console.log('element', angular.element(element));
        var form = angular.element(element);
        var url = form.attr('action');
        console.log('url', url);
    }
}

