describe('BlockToFeature Service', function () {
    beforeEach(angular.mock.module("blockweltapp"))

    function createCoordinate(latitude, longitude) {
        return {
            longitude: longitude,
            latitude: latitude
        };
    }

    var singleBlockGrid = {
        longitude: 0,
        latitude: 1,
        width: 2,
        height: 3,
        numLongitude: 1,
        numLatitude: 1
    };

    var twoBlockGrid = {
        longitude: 0,
        latitude: 0,
        width: 1,
        height: 1,
        numLongitude: 2,
        numLatitude: 2
    };

    describe('When I use a grid with one block only with no coordinates', function () {
        var data = [];

        it('returns the feature without text', inject(function (projectionService,blockToFeatureService) {
            const projectedBlocks = projectionService.project(singleBlockGrid, data);
            const features = blockToFeatureService.convertToFeatures(projectedBlocks);
            expect(features.length).toEqual(1);
        }));

        it('returns returns one feature', inject(function (projectionService,blockToFeatureService) {
            const projectedBlocks = projectionService.project(singleBlockGrid, data);
            const features = blockToFeatureService.convertToFeatures(projectedBlocks);
            expect(features[0].getStyle().getText().getText()).not.toBeDefined();
        }));

        //TODO test correct transformation
    });

    describe('When I use a grid with one block only with one coordinates within', function () {
        var data = [createCoordinate(0.5, 0.5)];

        it('returns a feature with correct text', inject(function (projectionService,blockToFeatureService) {
            const projectedBlocks = projectionService.project(singleBlockGrid, data);
            const features = blockToFeatureService.convertToFeatures(projectedBlocks);
            expect(features[0].getStyle().getText().getText()).toEqual("1\n1\n1.00");
        }))
    });
});