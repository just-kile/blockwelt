var module = angular.module('blockweltapp');

module.controller("ProgressDialogController", function ($scope) {

    $scope.$watch("model.progress", function(newValue) {
        if(newValue) {
            $('#progressDialog').modal('show');
        } else {
            $('#progressDialog').modal('hide');
        }
    })

});

