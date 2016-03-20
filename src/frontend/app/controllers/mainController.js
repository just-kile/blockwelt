angular.module('blockweltapp').controller("MainController", function ($http, $scope, importService) {

    $scope.model = {

        locations: [],
        shareURL: ''

    };

    this.visualize = function () {
        importService.initializePartialImport();
        $scope.model.progress = true;
        $scope.model.locations = [];

        var file = document.getElementById('file').files[0];

        const numChunks = 100;

        var fileSize = file.size;
        var chunkSize = file.size / numChunks;
        var offset = 0;

        var callbackProgress = function (data) {

            $scope.$apply(function () {
                var newLocations = importService.importPartial(data);
                $scope.model.locations = $scope.model.locations.concat(newLocations);
            });
        };


        var callbackDone = function () {
            $scope.$apply(function () {
                $scope.model.progress = false;
            });
        };

        function readBlock(_offset, _chunkSize, _file, _cb) {
            var parseChunk = function (event) {
                if (event.target.error == null) {
                    offset += event.target.result.length;
                    callbackProgress(event.target.result);
                } else {
                    console.log("Read error: " + event.target.error);
                    return;
                }
                if (offset >= fileSize) {
                    callbackDone();
                    return;
                }

                readBlock(_offset, _chunkSize, _file);
            };

            var r = new FileReader();
            var blob = _file.slice(_offset, _chunkSize + _offset);
            r.onload = parseChunk;
            r.readAsBinaryString(blob);
        }
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