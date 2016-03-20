/**
 * Created by thomas on 20.03.16.
 */

describe("Test Share Handler", function () {

    var Locations = require('../../src/backend/models/locations');
    var ShareHandler = require('../../src/backend/shareHandler');
    var shareHandler =  new ShareHandler();


    it("should return 400 when there is no location data", function (done) {
        console.log('foo');

        var response = jasmine.createSpyObj('response', ['status', 'send']);
        response.status.and.returnValue(response);
        shareHandler.upload({request: {}}, response);
        done();

    });
});