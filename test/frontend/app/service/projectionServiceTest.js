/**
 * Created by thomas on 09.01.16.
 */

describe('Projection Service', function () {
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

        it('An 2 dimensional array with one entry', inject(function (projectionService) {
            expect(projectionService.project(singleBlockGrid, data).length).toEqual(1)
            expect(projectionService.project(singleBlockGrid, data)[0].length).toEqual(1)
        }))

        it('returns count 0 for the single block', inject(function (projectionService) {
            expect(projectionService.project(singleBlockGrid, data)[0][0].count).toEqual(0)
        }))

        it('returns correct longitude for the block', inject(function (projectionService) {
            expect(projectionService.project(singleBlockGrid, data)[0][0].longitude).toEqual(singleBlockGrid.longitude)
        }))

        it('returns correct latitude for the block', inject(function (projectionService) {
            expect(projectionService.project(singleBlockGrid, data)[0][0].latitude).toEqual(singleBlockGrid.latitude)
        }))

        it('returns correct width for the block', inject(function (projectionService) {
            expect(projectionService.project(singleBlockGrid, data)[0][0].width).toEqual(singleBlockGrid.width)
        }))

        it('returns correct height for the block', inject(function (projectionService) {
            expect(projectionService.project(singleBlockGrid, data)[0][0].height).toEqual(singleBlockGrid.height)
        }))

    })

    describe('When I use a grid with one block only with one coordinates within the block', function () {

        var data = [createCoordinate(0.5, 0.5)];

        it('returns count 1 for the single block', inject(function (projectionService) {
            expect(projectionService.project(singleBlockGrid, data)[0][0].count).toEqual(1)
        }))

    })

    describe('When I use a grid with two block along latitude', function () {

        var data = [];
        var grid = {
            longitude: 0,
            latitude: 1,
            width: 2,
            height: 3,
            numLongitude: 1,
            numLatitude: 2
        };

        it('An 2 dimensional array with two entries', inject(function (projectionService) {
            expect(projectionService.project(grid, data).length).toEqual(1)
            expect(projectionService.project(grid, data)[0].length).toEqual(2)
        }))

        it('returns correct latitude for second block', inject(function (projectionService) {
            expect(projectionService.project(grid, data)[0][1].latitude).toEqual(grid.latitude + grid.width)
        }))


    })

    describe('When I use a grid with two block along longitude', function () {

        var data = [];
        var grid = {
            longitude: 0,
            latitude: 1,
            width: 2,
            height: 3,
            numLongitude: 2,
            numLatitude: 1
        };

        it('An 2 dimensional array with two entries', inject(function (projectionService) {
            expect(projectionService.project(grid, data).length).toEqual(2)
            expect(projectionService.project(grid, data)[0].length).toEqual(1)
            expect(projectionService.project(grid, data)[1].length).toEqual(1)
        }))

        it('returns correct longitude for second block', inject(function (projectionService) {
            expect(projectionService.project(grid, data)[1][0].longitude).toEqual(grid.longitude + grid.height)
        }))


    })

    describe('When I use a two block grid with one coordinate', function () {

        it('Returns count 1 for upper left block', inject(function (projectionService) {
            var data = [createCoordinate(0.5, 0.5)];
            expect(projectionService.project(twoBlockGrid, data)[0][0].count).toEqual(1)
            expect(projectionService.project(twoBlockGrid, data)[0][1].count).toEqual(0)
            expect(projectionService.project(twoBlockGrid, data)[1][0].count).toEqual(0)
            expect(projectionService.project(twoBlockGrid, data)[1][1].count).toEqual(0)
        }))

        it('Returns count 1 for upper right block', inject(function (projectionService) {
            var data = [createCoordinate(1.5, 0.5)];
            expect(projectionService.project(twoBlockGrid, data)[0][0].count).toEqual(0)
            expect(projectionService.project(twoBlockGrid, data)[0][1].count).toEqual(1)
            expect(projectionService.project(twoBlockGrid, data)[1][0].count).toEqual(0)
            expect(projectionService.project(twoBlockGrid, data)[1][1].count).toEqual(0)
        }))

        it('Returns count 1 for lower left block', inject(function (projectionService) {
            var data = [createCoordinate(0.5, 1.5)];
            expect(projectionService.project(twoBlockGrid, data)[0][0].count).toEqual(0)
            expect(projectionService.project(twoBlockGrid, data)[0][1].count).toEqual(0)
            expect(projectionService.project(twoBlockGrid, data)[1][0].count).toEqual(1)
            expect(projectionService.project(twoBlockGrid, data)[1][1].count).toEqual(0)
        }))

        it('Returns count 1 for lower right block', inject(function (projectionService) {
            var data = [createCoordinate(1.5, 1.5)];
            expect(projectionService.project(twoBlockGrid, data)[0][0].count).toEqual(0)
            expect(projectionService.project(twoBlockGrid, data)[0][1].count).toEqual(0)
            expect(projectionService.project(twoBlockGrid, data)[1][0].count).toEqual(0)
            expect(projectionService.project(twoBlockGrid, data)[1][1].count).toEqual(1)
        }))



    })


    describe('When I use a grid with one block only with one coordinates outside of the block', function () {

        var data = [createCoordinate(5, 5)];

        it('returns count 0 for the single block',  inject(function (projectionService) {
            expect(projectionService.project(singleBlockGrid, data)[0][0].count).toEqual(0)
        }))

    })

    describe('When I use a grid with one block only with two coordinates inside of the block', function () {

        var data = [createCoordinate(2, 2), createCoordinate(2, 2)];

        it('returns count 2 for the single block',  inject(function (projectionService) {
            expect(projectionService.project(singleBlockGrid, data)[0][0].count).toEqual(2)
        }))

    })


})
