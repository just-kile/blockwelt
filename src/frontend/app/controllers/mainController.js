angular.module('blockweltapp').controller("MainController", function (projectionService) {
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

        var vectorSource = new ol.source.Vector();
        map.addLayer(new ol.layer.Vector({
            source: vectorSource
        }));
        vm.paint_blocks = function () {
            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 0, 0, 0.6)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#319FD3',
                    width: 1
                })
            });
            var polygon = ol.geom.Polygon.fromExtent([1400000, 6800000, 1600000, 6950000]);
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
    }
);