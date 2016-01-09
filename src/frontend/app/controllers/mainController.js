angular.module('blockweltapp').controller("MainController", function ($http, importService) {

    this.upload = function (path) {
        $http({
            method: 'GET',
            url: path,
        }).success(function (data) {
            var rawData = importService.importData(data);
            console.log(rawData);
            // TODO: Use the data, my little padawan
        }).error(function () {
            alert("error");
        });
    };

    this.initialize = function () {
        this.upload('../../../example/locations.json');
    };

    var map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: 'map',
        view: new ol.View({
            center: [0, 0],
            zoom: 2
        })
    });
    var graticule = new ol.Graticule();
    graticule.setMap(map);

    var vectorSource = new ol.source.Vector();
    map.addLayer(new ol.layer.Vector({
        source: vectorSource
    }));
    this.paint_blocks = function () {
        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 0, 0, 0.6)'
            }),
            stroke: new ol.style.Stroke({
                color: '#319FD3',
                width: 1
            })
        });
        var polygon = ol.geom.Polygon.fromExtent([1400000, 6800000, 1600000, 6900000]);
        var feature = new ol.Feature({
            geometry: polygon
        });
        feature.setStyle(style);
        vectorSource.addFeature(feature);
    };

    vm.with_data = function() {
        var grid = {
            longitude: 1400000,
            latitude: 6800000,
            width: 20000,
            height: 15000,
            numLongitude: 10,
            numLatitude: 10
        };

        var data = {
            "locations": [{
                "latitudeE7": 525557393,
                "longitudeE7": 133418855
            }, {
                "latitudeE7": 525557393,
                "longitudeE7": 133418855
            }]
        }

        var projection = projectionService.project(grid, []);
        var features = projectionService.convertToFeatures(projection);
        vectorSource.addFeatures(features);

    }
);