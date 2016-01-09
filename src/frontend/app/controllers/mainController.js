angular.module('blockweltapp').controller("MainController", function($http, importService){

    function createMap() {
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
    }

    this.upload = function(path) {
        $http({
            method: 'GET',
            url: path,
        }).success(function(data){
            var rawData = importService.importData(data);
            console.log(rawData);
            // TODO: Use the data, my little padawan
        }).error(function() {
            alert("error");
        });
    };

    this.initialize = function() {
        this.upload('../../../example/locations.json');
    };

    createMap();
});