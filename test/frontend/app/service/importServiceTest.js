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

    describe('When I import a partial JSON that is emtpy', function() {

        it('returns an empty array', inject(function(importService) {
            expect(importService.importPartial("").length).toEqual(0);
        }))

    })

    describe('When I import a complete JSON partially', function() {

        var json = ''
            + '{'
            + '  "locations": ['
            + '     {'
            + '       "timestampMs": "1452333103392",'
            + '       "latitudeE7": 525557393,'
            + '       "longitudeE7": 133418855,'
            + '       "accuracy": 30'
            + '     }'
            + '  ]'
            + '}';

        it('returns an empty with size 1', inject(function(importService) {
            expect(importService.importPartial(json).length).toEqual(1);
        }))

        it('returns entry with correct position', inject(function(importService) {
            var model = importService.importPartial(json);
            var position = model[0];

            expect(position.latitude).toEqual(525557393 * 1e-7);
            expect(position.longitude).toEqual(133418855 * 1e-7);
        }))

    })

    describe('When I import a complete JSON with activity partially', function() {

        var json = ''
            + '{'
            + '  "locations": ['
            + '     {'
            + '       "timestampMs": "1452333103392",'
            + '       "latitudeE7": 525557393,'
            + '       "longitudeE7": 133418855,'
            + '       "accuracy": 30,'
            + '       "activitys": ['
            + '         {'
            + '           "timestampMs": "1452333038481",'
            + '           "activities": ['
            + '             {'
            + '               "type": "still",'
            + '               "confidence": 69'
            + '             },'
            + '             {'
            + '               "type": "inVehicle",'
            + '               "confidence": 31'
            + '             }'
            + '           ]'
            + '         }'
            + '       ]'
            + '     }'
            + '  ]'
            + '}';

        it('returns an empty with size 1', inject(function(importService) {
            expect(importService.importPartial(json).length).toEqual(1);
        }))

    })

    describe('When I import a partial JSON that contains only one location', function() {

        var json = ''
            + '{'
            + '  "locations": ['
            + '     {'
            + '       "timestampMs": "1452333103392",'
            + '       "latitudeE7": 525557393,'
            + '       "longitudeE7": 133418855,'
            + '       "accuracy": 30'
            + '     },'
            + '     {'
            + '       "timestampMs": "1452333103394",'
            + '       "latitudeE7": 525557396,'
            + '       "longitudeE7": 133418850,';

        it('returns an empty with size 1', inject(function(importService) {
            expect(importService.importPartial(json).length).toEqual(1);
        }))

    })

    describe('When I import a partial JSON that contains only one location and a second one that contains another one', function() {

        var json1 = ''
            + '{'
            + '  "locations": ['
            + '     {'
            + '       "timestampMs": "1452333103392",'
            + '       "latitudeE7": 525557393,'
            + '       "longitudeE7": 133418855,'
            + '       "accuracy": 30'
            + '     },'
            + '     {'
            + '       "timestampMs": "1452333103394",'
            + '       "latitudeE7": 525557396,'
            + '       "longitudeE7": 133418850,';

        var json2 = ''
            + '       "accuracy": 30'
            + '     },';

        it('returns arrays size of 1 for second call', inject(function(importService) {
            importService.importPartial(json1);

            expect(importService.importPartial(json2).length).toEqual(1);
        }))

        it('returns arrays size of 0 for second call if initializePatialImport was called in between', inject(function(importService) {
            importService.importPartial(json1);
            importService.initializePartialImport();
            expect(importService.importPartial(json2).length).toEqual(0);
        }))

    })


})