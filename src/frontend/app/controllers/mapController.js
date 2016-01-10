angular.module('blockweltapp').controller("MapController", function (projectionService, $scope) {

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

    var updateMap = function() {
        var extent = retrieveMapExtent();

        var grid = {
            latitude: extent[1],
            longitude: extent[0],
            width: Math.abs(extent[1] - extent[3]) / gridSize,
            height: Math.abs(extent[0] - extent[2]) / gridSize,
            numLongitude: gridSize,
            numLatitude: gridSize
        };

        var projection = projectionService.project(grid, $scope.model.locations);
        var features = projectionService.convertToFeatures(projection);
        vectorSource.clear();
        vectorSource.addFeatures(features);
    };

    function retrieveMapExtent() {
        var extent = map.getView().calculateExtent(map.getSize());
        return ol.proj.transformExtent(extent, "EPSG:3857", "EPSG:4326");
    }

    $scope.$watch('model.locations', updateMap);

    map.on('moveend', updateMap);
    var vectorSource = new ol.source.Vector();

    map.addLayer(new ol.layer.Vector({
        source: vectorSource
    }));

    const gridSize = 20;

})