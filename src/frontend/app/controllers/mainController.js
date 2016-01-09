angular.module('blockweltapp').controller("MainController", function($http){
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
            center: [0, 0],
            zoom: 2
        })
    });
    var graticule = new ol.Graticule();
    graticule.setMap(map);
});