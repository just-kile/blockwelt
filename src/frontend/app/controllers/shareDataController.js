angular.module('blockweltapp').controller("ShareDataController", function ($http, $scope) {


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
            $scope.model.shareURL = response.data.id;
        }, function () {
            $scope.model.shareURL = "ERROR";
        });
    }

});