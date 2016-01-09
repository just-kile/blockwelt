describe('Import Service', function () {
    beforeEach(angular.mock.module("blockweltapp"))

    describe('When I pass an empty invalid object', function () {

        it('returns an empty list', inject(function (importService) {
            expect(importService.importData({})).toEqual([])
        }))

    })

    describe('When I pass google location data containing a single location', function () {

        var latitudeE7 = 525557393;
        var longitudeE7 = 133418855;
        var data = {
            "locations": [{
                "latitudeE7": latitudeE7,
                "longitudeE7": longitudeE7
            }]
        }

        it('returns a list with one enty', inject(function (importService) {
            expect(importService.importData(data).length).toEqual(1)
        }))

        it('entry contains correct latitude', inject(function (importService) {
            expect(importService.importData(data)[0].latitude).toEqual(latitudeE7 * 1e-7)
        }))

        it('entry contains correct longitude', inject(function (importService) {
            expect(importService.importData(data)[0].longitude).toEqual(longitudeE7 * 1e-7)
        }))

    })

    describe('When I pass google location data containing a two locations', function () {

        var data = {
            "locations": [{
                "latitudeE7": 525557393,
                "longitudeE7": 133418855
            }, {
                "latitudeE7": 525557393,
                "longitudeE7": 133418855
            }]
        }

        it('returns a list with two enties', inject(function (importService) {
            expect(importService.importData(data).length).toEqual(2)
        }))

    })
})