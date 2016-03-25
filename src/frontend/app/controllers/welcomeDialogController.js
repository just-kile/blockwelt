var module = angular.module('blockweltapp');

module.controller("WelcomeDialogController", function ($scope, $uibModalInstance) {
   $scope.btnWelcomeLoad = function () {
       
   };

    $scope.btnWelcomeExample = function () {
        $uibModalInstance.close("example");
    }
});