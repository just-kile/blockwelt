/**
 * Created by thomas on 14.02.16.
 */

angular.module('blockweltapp').controller("ShareDataController", function ($http, $scope) {


    var req = {
        method: 'POST',
        url: 'rest/upload',
        data: {test: 'test'}
    }

    $scope.share = function() {
        $http(req).then(function () {
            alert('success')
        }, function () {
            alert('failure')
        });
    };

});