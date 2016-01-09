angular.module('blockweltapp').controller("MainController", function ($http, importService, projectionService) {
    var model;
    this.upload = function (path) {
        $http({
            method: 'GET',
            url: path
        }).success(function (data) {
            loadData(data)
        }).error(function () {
            alert("error");
        });
    };
    const gridSize = 20;
    function updateMap(extent) {
        var grid = {
            latitude: extent[1],
            longitude: extent[0],
            width: Math.abs(extent[1] - extent[3])/ gridSize,
            height: Math.abs(extent[0] - extent[2])/gridSize,
            numLongitude: gridSize,
            numLatitude: gridSize
        };
        console.log(grid);
        var projection = projectionService.project(grid, model);
        var features = projectionService.convertToFeatures(projection);
        vectorSource.clear();
        vectorSource.addFeatures(features);
    }

    function loadData(locations) {
        model = importService.importData(locations);
        updateMap([52,13, 53, 14]);
    }


    function onMoveEnd(evt) {
        var map = evt.map;
        var extent = map.getView().calculateExtent(map.getSize());
        extent = ol.proj.transformExtent(extent, "EPSG:3857", "EPSG:4326");
        console.log(extent);
        updateMap(extent);
    }

    this.visualize = function () {
        var f = document.getElementById('file').files[0],
            r = new FileReader();
        r.onloadend = function (e) {
            var data = e.target.result;
            var locations = angular.fromJson(data);
            loadData(locations);
        };
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

    map.on('moveend', onMoveEnd);

    var vectorSource = new ol.source.Vector();
    map.addLayer(new ol.layer.Vector({
        source: vectorSource
    }));

    this.with_data = function () {
        this.upload('locations.json');
    }
});