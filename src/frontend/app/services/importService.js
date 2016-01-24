var module = angular.module('blockweltapp');

module.factory('importService', function () {

    function doImport(googleData) {
        var model = []

        var transformation = function (location) {
            var entry = {
                latitude: location.latitudeE7 * 1e-7,
                longitude: location.longitudeE7 * 1e-7
            };
            this.push(entry);
        };
        angular.forEach(googleData.locations, transformation, model);

        return model;
    }

    function doImportData(googleData) {
        var hasValidData = googleData && googleData.locations;
        if (hasValidData) {
            return doImport(googleData);
        }
        return [];
    }

    var service = {
        importData: doImportData,

        importPartial: function (json) {
            try {
                return doImportData(angular.fromJson(json));
            } catch (exception) {
                return [];
            }
        }
    };

    return service;
});