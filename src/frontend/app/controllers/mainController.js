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
            var polygon = ol.geom.Polygon.fromExtent([1400000, 6800000, 1600000, 6900000]);
            var feature = new ol.Feature({
                geometry: polygon
            });
            feature.setStyle(style);
            vectorSource.addFeature(feature);
        }
    }
);