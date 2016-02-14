angular.module('blockweltapp').controller("MainController", function ($http, $scope, importService) {

    $scope.model = {

        locations: [],
        shareURL: ''

    };

    this.visualize = function () {
        $scope.model.progress = true;
        var file = document.getElementById('file').files[0];
        var reader = new FileReader();
        reader.onloadend = function (e) {
            var data = e.target.result;
            var locations = angular.fromJson(data);
            $scope.$apply(function() {
                importData(locations);
            });
        };
        reader.readAsBinaryString(file);
    };

    this.showExampleData = function () {
        $scope.model.progress = true;
        downloadData('example/locations.json');
    };

    function downloadData(path) {
        $http({
            method: 'GET',
            url: path
        }).success(function (data) {
            importData(data)
        }).error(function () {
            alert("Error while uploading the data.");
        });
    }

    function importData(locations) {
        $scope.model.locations = importService.importData(locations);
        $scope.model.progress = false;
    }


});