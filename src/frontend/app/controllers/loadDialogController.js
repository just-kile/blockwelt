var module = angular.module('blockweltapp');

module.controller("LoadDialogController", function ($scope, $uibModal) {


    $scope.loadData = function(){
        var modalInstance = $uibModal.open({
            templateUrl: 'app/templates/loadDialog.html',
            controller: 'LoadDialogWindowController',
            backdrop: false
        });
    };
});

module.controller("LoadDialogWindowController", function ($scope, $uibModalInstance) {
    var selectedFile;

    $scope.selectFile = function(file) {
        selectedFile = file;
        $scope.fileName = file.name;
    };
});

module.directive('onReadFile', function ($parse) {
    return {
        restrict: 'A',
        scope: false,
        link: function (scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);

            element.on('change', function (onChangeEvent) {
                var file = (onChangeEvent.srcElement || onChangeEvent.target).files[0];
                scope.$apply(function() {
                    fn(scope, {file: file});
                });

            });
        }
    };
});