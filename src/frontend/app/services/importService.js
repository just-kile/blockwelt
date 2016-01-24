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

    function findNextObject(string, startIndex) {
        var i = string.indexOf('{', startIndex);

        if (i == -1) {
            return -1;
        }

        var hierachy = 1;
        i++;

        while (hierachy > 0 && i < string.length) {
            if (string.charAt(i) == '{') {
                hierachy++;
            } else if (string.charAt(i) == '}') {
                hierachy--;
            }

            i++;
        }

        if (hierachy > 0) {
            return -1;
        }

        return i;
    }

    var unprocessedData;

    var service = {

        importData: doImportData,

        initializePartialImport: function() {
            unprocessedData = undefined;
        },

        importPartial: function (originalJson) {

            var json = unprocessedData + originalJson;


            try {
                var locationsIndex = json.indexOf('"locations"');
                if (locationsIndex != -1) {
                    var bracketIndex = json.indexOf('[', locationsIndex);
                    if (bracketIndex != -1) {
                        json = json.substring(bracketIndex + 1);
                    }
                }

                var newJson = '';
                var index = 0;

                while (true) {
                    var newIndex = findNextObject(json, index);
                    if (newIndex == -1) {
                        unprocessedData = json.substring(index);


                        unprocessedData = unprocessedData.trim();
                        if (unprocessedData.charAt(0) == ',') {
                            unprocessedData = unprocessedData.substring(1);
                        }

                        break;
                    }

                    newJson += json.substring(index, newIndex);
                    index = newIndex;
                }


                json = '{"locations":[' + newJson + ']}';
                return doImportData(angular.fromJson(json));
            } catch (exception) {
                return [];
            }
        }
    };

    return service;
});