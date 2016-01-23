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

    function getMaxCount(projection) {
        var m = 0;
        for (var x = 0; x < projection.length; x++) {
            for (var y = 0; y < projection[0].length; y++) {
                m = projection[x][y].count > m ? projection[x][y].count : m;
            }
        }
        return m;
    }


    function mapBlockCount(block, maxCount) {
        return Math.log(1 + block.count) / Math.log(maxCount);
    }

    function createColor(block, maxCount) {
        var c = Math.floor(255 - 255 * mapBlockCount(block, maxCount));
        var color = [255, c, 0, .6];
        color = block.count == 0 ? [0, 0, 0, 0.2] : color;
        return color;
    }

    function getBlockText(block, maxCount) {
        var text = new ol.style.Text();
        if (block.count > 0) {
            text.setFont('8px sans-serif');
            text.setStroke(new ol.style.Stroke({width: 0.7}));
            text.setText(block.count + "\n"
                + maxCount + "\n"
                + mapBlockCount(block, maxCount).toFixed(2));
        }
        return text;
    }

    function createFeatureFromBlock(block, maxCount) {
        var color = createColor(block, maxCount);
        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: color
            }),
            stroke: new ol.style.Stroke({
                color: 'black',
                width: .1
            }),
            text: getBlockText(block, maxCount)
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
            var maxCount = getMaxCount(projection);
            var features = [];
            for (var x = 0; x < projection.length; x++) {
                for (var y = 0; y < projection[0].length; y++) {
                    features.push(createFeatureFromBlock(projection[x][y], maxCount));
                }
            }
            return features;
        }

    };

    return service;

});