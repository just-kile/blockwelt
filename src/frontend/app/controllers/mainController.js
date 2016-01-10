angular.module('blockweltapp').controller("MainController", function ($http, $scope, importService) {

    $scope.model = {

        locations: []

    };

    this.visualize = function () {
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
    }


});