angular.module('blockweltapp').controller("MainController", function () {
        var vm = this;
        vm.welcome_message = "This is Blockwelt.";
        var map = new ol.Map({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            target: 'map',
            view: new ol.View({
                center: [1492099.997378, 6889621.697647], //berlin
                zoom: 9
            })
        });
        var graticule = new ol.Graticule({targetSize: 50});
        graticule.setMap(map);

        var featureOverlay = new ol.FeatureOverlay();
        featureOverlay.setMap(map);

        //vm.paint_blocks = function () {

        var geojsonObject = {
            'type': 'FeatureCollection',
            'crs': {
                'type': 'name',
                'properties': {
                    'name': 'EPSG:3857'
                }
            },
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': [[
                            [1.4e6, 6.9e6],
                            [1.6e6, 6.9e6],
                            [1.6e6, 6.8e6],
                            [1.4e6, 6.8e6]
                        ]]
                    }
                }
            ]
        };
        var features = (new ol.format.GeoJSON()).readFeatures(geojsonObject);
        featureOverlay.addFeature(features[0]);

        //}
    }
);