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
        //TODO proper mapping from count to color/alpha
        var c = block.count > 0 ? 'rgba(255,0,0,0.6)' : 'rgba(0,0,255,0.6)';
        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: c
            }),
            stroke: new ol.style.Stroke({
                color: '#319FD3',
                width: 1
            })
        });
        var extent = ol.proj.transformExtent([
            block.longitude,
            block.latitude,
            block.longitude + block.height,
            block.latitude + block.width
        ], sourceProjection, mapProjection);
        var feature = new ol.Feature({
            geometry: ol.geom.Polygon.fromExtent(extent)
        });
        feature.setStyle(style);
        return feature;

    }

    var service = {

        project: function (grid, data) {

            var projection = [];

            console.log(data[0]);
            console.log(grid);

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
        },

        convertToFeatures: function (projection) {
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

});