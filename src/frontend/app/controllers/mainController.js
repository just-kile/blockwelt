angular.module('blockweltapp').controller("MainController", function ($http, importService, projectionService) {

    this.upload = function (path) {
        $http({
            method: 'GET',
            url: path,
        }).success(function (data) {
            var rawData = importService.importData(data);

            var grid = {
                longitude: 52,
                latitude: 13,
                width: 0.1,
                height: 0.1,
                numLongitude: 10,
                numLatitude: 10
            };

            var projection = projectionService.project(grid, rawData);
            var features = projectionService.convertToFeatures(projection);
            vectorSource.addFeatures(features);
        }).error(function () {
            alert("error");
        });
    };

    this.initialize = function () {
        //this.upload('../../../example/locations.json');
    };

    var map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: 'map',
        view: new ol.View({
            center: [1520000, 6880000],
            zoom: 6
        })
    });

    var vectorSource = new ol.source.Vector();
    map.addLayer(new ol.layer.Vector({
        source: vectorSource
    }));
    var graticule = new ol.Graticule();
    graticule.setMap(map);


    this.with_data = function () {
        this.upload('locations.json');
    }
})