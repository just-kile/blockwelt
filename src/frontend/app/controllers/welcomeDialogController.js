var module = angular.module('blockweltapp');

module.controller("WelcomeDialogController", function ($scope) {
    var welcome = function(){
        $('#welcomeDialog').modal('show');
    };
    if ($scope.model.locations.length == 0){
        welcome();
    }
});