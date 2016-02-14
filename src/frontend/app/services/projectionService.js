var module = angular.module('blockweltapp');

module.factory('projectionService', function () {

    function createBlock(longitude, latitude, grid) {
        var block = {
            longitude: longitude,
            latitude: latitude,
            width: grid.width,
            height: grid.height,
            count: 0
        };
        return block;
    }

    var service = {

        project: function (grid, data) {

            var projection = [];

            for (var y = 0; y < grid.numLongitude; y++) {
                projection.push([]);
                for (var x = 0; x < grid.numLatitude; x++) {
                    projection[y].push(createBlock(grid.longitude + y * grid.height, grid.latitude + x * grid.width, grid));
                }
            }

            angular.forEach(data, function (coordinate) {
                var x = ((coordinate.latitude - grid.latitude) / grid.width) | 0;
                var y = ((coordinate.longitude - grid.longitude) / grid.height) | 0;

                if (x >= 0 && x < grid.numLatitude && y >= 0 && y < grid.numLongitude) {
                    projection[y][x].count++
                }
            });

            return projection;
        }
    };
    return service;
});