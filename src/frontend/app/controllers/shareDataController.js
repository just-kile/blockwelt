angular.module('blockweltapp').controller("ShareDataController", function ($http, $scope, $location) {


    $scope.share = function() {
        $('#shareDialog').modal('show');
    };

    $scope.shareData = function() {
        var req = {
            method: 'POST',
            url: 'rest/share/upload',
            data: {locations: $scope.model.locations}
        };

        $http(req).then(function (response) {
            var host = $location.host();
            var port = $location.port();

            $scope.model.shareURL = "http://" + host;
            if (port != 80){
                $scope.model.shareURL += ":" + port;
            }
            $scope.model.shareURL += "/rest/share/" + response.data.id;
        }, function () {
            $scope.model.shareURL = "ERROR";
        });
    }

});