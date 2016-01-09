angular.module('blockweltapp').controller("MainController", function ($http, importService, projectionService) {

    function processData(rawData) {
        var grid = {
            longitude: 13,
            latitude: 52,
            width: 0.1,
            height: 0.1,
            numLongitude: 10,
            numLatitude: 10
        };

        var projection = projectionService.project(grid, rawData);
        var features = projectionService.convertToFeatures(projection);
        vectorSource.addFeatures(features);
    }

    this.upload = function (path) {
        $http({
            method: 'GET',
            url: path,
        }).success(function (data) {
            processData(data)
        }).error(function () {
            alert("error");
        });
    };

    function processData(locations) {
        var model = importService.importData(locations);
        var grid = {
            longitude: 13,
            latitude: 52,
            width: 0.1,
            height: 0.1,
            numLongitude: 10,
            numLatitude: 10
        };
        var projection = projectionService.project(grid, model);
        var features = projectionService.convertToFeatures(projection);
        vectorSource.addFeatures(features);
    }

    this.visualize = function () {
        var f = document.getElementById('file').files[0],
            r = new FileReader();
        r.onloadend = function (e) {
            var data = e.target.result;
            var locations = angular.fromJson(data);
            processData(locations);
        }
        r.readAsBinaryString(f);
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