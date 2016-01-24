angular.module('blockweltapp').controller("MainController", function ($http, $scope, importService) {

    $scope.model = {

        locations: []

    };

    this.visualize = function () {
        $scope.model.progress = true;
        $scope.model.locations = [];

        var file = document.getElementById('file').files[0];
        const numChunks = 100;

        var fileSize = file.size;
        var chunkSize = file.size / numChunks;
        var offset = 0;
        var readBlock = null;

        var callback = function (data) {

            $scope.$apply(function () {
                var newLocations = importService.importPartial(data);
                $scope.model.locations = $scope.model.locations.concat(newLocations);
            });
        }

        var parseChunk = function (event) {
            if (event.target.error == null) {
                offset += event.target.result.length;
                callback(event.target.result); // callback for handling read chunk
            } else {
                console.log("Read error: " + event.target.error);
                return;
            }
            if (offset >= fileSize) {
                $scope.$apply(function () {
                    $scope.model.progress = false;
                });
                return;
            }

            readBlock(offset, chunkSize, file);
        }

        readBlock = function (_offset, length, _file) {
            var r = new FileReader();
            var blob = _file.slice(_offset, length + _offset);
            r.onload = parseChunk;
            r.readAsBinaryString(blob);
        }


        importService.initializePartialImport();
        readBlock(offset, chunkSize, file);


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