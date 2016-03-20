angular.module('blockweltapp').controller("MapController", function (projectionService, blockToFeatureService, gridService, $scope) {

    var interactionsWithoutRotating = ol.interaction.defaults({altShiftDragRotate:false, pinchRotate:false});
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
        }),
        interactions: interactionsWithoutRotating
    });

    var updateMap = function() {
        var extent = retrieveMapExtent();

        var grid = gridService.calculate({
            latitude: extent[1],
            longitude: extent[0],
            width: Math.abs(extent[1] - extent[3]),
            height: Math.abs(extent[0] - extent[2])
        });

        var projection = projectionService.project(grid, $scope.model.locations);
        var features = blockToFeatureService.convertToFeatures(projection);
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

});
