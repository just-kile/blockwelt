var module = angular.module('blockweltapp');

module.controller("WelcomeDialogController", function ($scope, $uibModal) {

    var showWelcomeDialog = function() {
        var modalInstance = $uibModal.open({
            templateUrl: 'app/templates/welcomeDialog.html',
            controller: 'WelcomeDialogWindowController',
            backdrop: false
        });
        modalInstance.result.then(function (response) {
            if (response == 'example'){
                $scope.showExampleData();
            } else if (response == "load" ) {
                showLoadDialog();
            }
        })
    };


});

module.controller("WelcomeDialogWindowController", function ($scope, $uibModalInstance) {
    $scope.btnWelcomeExample = function () {
        $uibModalInstance.close("example");
    }
});
