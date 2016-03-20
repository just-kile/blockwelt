angular.module('blockweltapp').controller("LoadDialogController", function ($scope) {
    var selectedFile;

    $scope.selectFile = function(file) {
        selectedFile = file;
        $scope.fileName = file.name;
    };

    $scope.loadData = function(){
        $('#loadDialog').modal('show');
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