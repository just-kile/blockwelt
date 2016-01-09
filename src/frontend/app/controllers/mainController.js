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
            center: [1492099.997378, 6889621.697647], //berlin
            zoom: 9
        })
    });
    var graticule = new ol.Graticule({targetSize: 50});
    graticule.setMap(map);

    vm.paint_blocks = function(){

        var meridians = graticule.getMeridians();
        var parallels = graticule.getParallels();
        var example_meridian_index = Math.floor(meridians.length/2);
        var example_parallels_index = Math.floor(parallels.length / 2);
        console.log(meridians[example_meridian_index].getCoordinates()[0]);
        console.log(meridians[example_meridian_index].getCoordinates()[1]);
        console.log(parallels[example_parallels_index].getCoordinates()[0]);
        console.log(parallels[example_parallels_index].getCoordinates()[1]);
    }
});