describe('Grid Service', function () {

    const cellCount = 20;

    beforeEach(angular.mock.module("blockweltapp"));


    describe('When I have a certain width and height', function () {

        const parameters = [
            {width: cellCount, height: cellCount, expectedDimension: 1},
            {width: cellCount / 2, height: cellCount / 2, expectedDimension: 0.5},
            {width: cellCount / 3, height: cellCount / 3, expectedDimension: 0.5},
            {width: cellCount / 4, height: cellCount / 4, expectedDimension: 0.25},
            {width: cellCount * 3, height: cellCount * 3, expectedDimension: 4},
            {width: cellCount, height: cellCount / 3, expectedDimension: 1}
        ];

        angular.forEach(parameters, function (parameter) {

            it('returns the expected dimension', inject(function (gridService) {
                const dimensions = createZeroOffsetDimension(parameter.width, parameter.height);

                expect(gridService.calculate(dimensions)).toEqual(jasmine.objectContaining({
                    width: parameter.expectedDimension,
                    height: parameter.expectedDimension
                }));

            }));
        });
    });

    describe('When I have a certain width and height', function () {

        const parameters = [
            {width: cellCount, height: cellCount, expectedNumLatitude: 20, expectedNumLongitude: 20},
            {width: cellCount / 2, height: cellCount / 2, expectedNumLatitude: 20, expectedNumLongitude: 20},
            {width: cellCount / 2, height: cellCount, expectedNumLatitude: 10, expectedNumLongitude: 20},
            {width: cellCount / 3, height: cellCount, expectedNumLatitude: 7, expectedNumLongitude: 20},  // round up!
            {width: cellCount, height: cellCount / 2, expectedNumLatitude: 20, expectedNumLongitude: 10},
        ];

        angular.forEach(parameters, function (parameter) {

            it('returns the expected cell count', inject(function (gridService) {
                const dimensions = createZeroOffsetDimension(parameter.width, parameter.height);

                expect(gridService.calculate(dimensions)).toEqual(jasmine.objectContaining({
                    numLatitude: parameter.expectedNumLatitude,
                    numLongitude: parameter.expectedNumLongitude
                }));
            }));

        });

    });

    describe('When I have a certain offset and dimension', function () {

        const parameters = [
            {latitude: 0, longitude: 0, width: cellCount, height: cellCount, expectedLatitude: 0, expectedLongitude: 0},
            {latitude: 1, longitude: 1, width: cellCount, height: cellCount, expectedLatitude: 1, expectedLongitude: 1},
            {latitude: 0.5, longitude: 0.5, width: cellCount / 2, height: cellCount / 2, expectedLatitude: 0.5, expectedLongitude: 0.5},
            {latitude: 0.5, longitude: 0, width: cellCount, height: cellCount, expectedLatitude: 0, expectedLongitude: 0},
            {latitude: 0, longitude: 0.5, width: cellCount, height: cellCount, expectedLatitude: 0, expectedLongitude: 0},
            {latitude: 19.62, longitude: -21.65, width: cellCount /4, height: cellCount / 4, expectedLatitude: 19.5, expectedLongitude: -21.75},
        ];

        angular.forEach(parameters, function (parameter) {

            it('returns the expected offset', inject(function (gridService) {

                expect(gridService.calculate(parameter)).toEqual(jasmine.objectContaining({
                    latitude: parameter.expectedLatitude,
                    longitude: parameter.expectedLongitude
                }));
            }));

        });

    });

    describe('When I have a certain offset and dimension', function () {

        const parameters = [
            {latitude: 0, longitude: 0, width: cellCount, height: cellCount, expectedNumLatitude: 20, expectedNumLongitude: 20},
            {latitude: 0.5, longitude: 0, width: cellCount, height: cellCount, expectedNumLatitude: 21, expectedNumLongitude: 20},
            {latitude: 0, longitude: 0.5, width: cellCount, height: cellCount, expectedNumLatitude: 20, expectedNumLongitude: 21},
        ];

        angular.forEach(parameters, function (parameter) {

            it('returns the expected cell count', inject(function (gridService) {

                expect(gridService.calculate(parameter)).toEqual(jasmine.objectContaining({
                    numLatitude: parameter.expectedNumLatitude,
                    numLongitude: parameter.expectedNumLongitude
                }));
            }));

        });

    });




    function createZeroOffsetDimension(width, height) {
        return {
            latitude: 0,
            longitude: 0,
            width: width,
            height: height
        }
    }

});
