/**
 * Created by thomas on 20.03.16.
 */

describe("Test Share Handler", function () {

    var Locations = require('../../src/backend/models/locations');
    var ShareHandler = require('../../src/backend/shareHandler');

    var shareHandler;
    var response;

    beforeEach(function () {
        response = jasmine.createSpyObj('response', ['status', 'send', 'json']);
        response.status.and.returnValue(response);

        shareHandler = new ShareHandler();
    });

    describe("upload", function () {
        it("should return 400 when there is no location data", function () {
            shareHandler.upload({}, response);

            expect(response.status).toHaveBeenCalledWith(400);
        });

        it("should return 'invalid data' if there is no location data", function () {
            shareHandler.upload({}, response);

            expect(response.send).toHaveBeenCalledWith('Invalid data.');
        });

        it("should return 200 when there is valid location data", function (done) {
            var locations = [{longitude: 1, latitude: 2}];

            response.status.and.callFake(function () {
                expect(response.status).toHaveBeenCalledWith(200);
                done();
            });

            shareHandler.upload({body: {locations: locations}}, response);
        });

        it("should return an id for the uploaded data", function (done) {
            var locations = [{longitude: 1, latitude: 2}];

            response.json.and.callFake(function () {
                expect(response.json).toHaveBeenCalledWith(jasmine.objectContaining({
                    id: jasmine.any(Object)
                }));
                done();
            });

            shareHandler.upload({body: {locations: locations}}, response);
        });

        it("should create a db document for given id", function (done) {
            var locations = [{longitude: 1, latitude: 2}];

            response.json.and.callFake(function (result) {
                Locations.find({_id: result.id}).then(function (data) {
                    expect(data.length).toBe(1);
                    done();
                }, function (error) {
                    done(error);
                });
            });

            shareHandler.upload({body: {locations: locations}}, response);
        });

        it("should create a db with the given location data", function (done) {
            var locations = [{longitude: 1, latitude: 2}];

            response.json.and.callFake(function (result) {
                Locations.find({_id: result.id}).then(function (data) {
                    expect(data[0].locations).toEqual(locations);
                    done();
                }, function (error) {
                    done(error);
                });
            });

            shareHandler.upload({body: {locations: locations}}, response);
        });

    });

    describe('get', function () {
        it('returns 400 if no id is given', function () {
            shareHandler.get({params: {}}, response);

            expect(response.status).toHaveBeenCalledWith(400);
        })


        it('returns 500 if invalid id is given', function (done) {
            shareHandler.get({params: {id: '01234'}}, response);

            response.status.and.callFake(function () {
                expect(response.status).toHaveBeenCalledWith(500);
                done();
            });
        });

        it('returns 200 if the given id exists', function (done) {
            var locations = [{longitude: 1, latitude: 2}];
            Locations.create({locations: locations}).then(function (data) {

                var id = data._id;
                shareHandler.get({params: {id: id}}, response);

                response.status.and.callFake(function () {
                    expect(response.status).toHaveBeenCalledWith(200);
                    done();
                });
            });
        });

        it('returns the locations if the given id exists', function (done) {
            var locations = [{longitude: 1, latitude: 2}];
            Locations.create({locations: locations}).then(function (data) {

                var id = data._id;
                shareHandler.get({params: {id: id}}, response);

                response.json.and.callFake(function (result) {
                    expect(result.locations).toEqual(locations);
                    done();
                });
            });
        });
    });
});