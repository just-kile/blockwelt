var module = angular.module('blockweltapp');

module.factory('projectionService', function () {

    var mapProjection = ol.proj.get("EPSG:3857");
    var sourceProjection = ol.proj.get("EPSG:4326");

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

    function createFeatureFromBlock(block) {
        var style = new ol.style.Style({
            //TODO proper mapping from count to color/alpha
            fill: new ol.style.Fill({
                color: 'rgba(255, 0, 0, ' + 1 / block.count + ')'
            }),
            stroke: new ol.style.Stroke({
                color: '#319FD3',
                width: 1
            })
        });
        console.log(block);
        var extent = ol.proj.transformExtent([
            block.latitude,
            block.longitude,
            block.latitude + block.width,
            block.longitude + block.height
        ], sourceProjection, mapProjection);
        var feature = new ol.Feature({
            geometry: ol.geom.Polygon.fromExtent(extent),
            style: style
        });
        return feature;

    }

    var service = {

        project: function (grid, data) {

            var projection = [];

            for (var y = 0; y < grid.numLongitude; y++) {
                projection.push([])
                for (var x = 0; x < grid.numLatitude; x++) {
                    projection[y].push(createBlock(grid.longitude + y * grid.height, grid.latitude + x * grid.width, grid));
                }
            }

            angular.forEach(data, function (coordinate) {
                var x = ((coordinate.latitude - grid.latitude) / grid.width) | 0
                var y = ((coordinate.longitude - grid.longitude) / grid.height) | 0

                if (x >= 0 && x < grid.numLatitude && y >= 0 && y < grid.numLongitude) {
                    projection[y][x].count++
                }
            });

            return projection;
        },


        convertToFeatures: function (projection) {
            //var xmin = projection[0][0].longitude;
            //var ymin = projection[0][0].latitude;
            //var xmax = xmin + projection.length * projection[0][0].width;
            //var ymax = ymin + projection[0].length * projection[0][0].height;
            //var geo = {
            //    type: "FeatureCollection",
            //    bbox: [xmin, ymin, xmax, ymax],
            //    features: []
            //};

            var features = [];
            for (var x = 0; x < projection.length; x++) {
                for (var y = 0; y < projection[0].length; y++) {
                    features.push(createFeatureFromBlock(projection[x][y]));
                }
            }
            return features;
        }

    };

    return service;

})