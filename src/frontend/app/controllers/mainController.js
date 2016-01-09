angular.module('blockweltapp').controller("MainController", function ($http, importService, projectionService) {

    this.upload = function (path) {
        $http({
            method: 'GET',
            url: path,
        }).success(function (data) {
            var rawData = importService.importData(data);
            var grid = {
                longitude: 1400000,
                latitude: 6800000,
                width: 20000,
                height: 15000,
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
            center: [0, 0],
            zoom: 2
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