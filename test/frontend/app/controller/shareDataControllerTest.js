describe('ShareData Controller', function () {

    var scope;
    var shareDataController;
    var httpBackend;

    const testLatitude = 525557393;
    const testLongitude = 133418855;
    const testId = '1000';

    beforeEach(angular.mock.module("blockweltapp"));

    beforeEach(function () {
        inject(function ($rootScope, $controller, $http, importService, $httpBackend) {
            scope = $rootScope.$new();

            scope.model = {
                locations: [{"latitude": testLatitude, "longitude": testLongitude}],
                shareURL: ''
            };

            httpBackend = $httpBackend;

            shareDataController = $controller('ShareDataController', {
                $scope: scope,
                $http: $http,
                importService: importService
            });
        })
    });

    describe('When I share data', function () {
        it('sends a post request to the backend', function () {
            httpBackend.when('POST', 'rest/share/upload').respond(200, '');
            httpBackend.expectPOST('rest/share/upload');
            scope.share();
            httpBackend.flush();
        });
    });

    describe('When I share data with one location', function () {
        it('sends the location the backend', function () {
            var expectedData = {locations: [{"latitude": testLatitude, "longitude": testLongitude}]};
            httpBackend.when('POST', 'rest/share/upload').respond(200, {id: testId});
            httpBackend.expectPOST('rest/share/upload', expectedData);
            scope.share();
            httpBackend.flush();
            expect(scope.model.shareURL).toEqual(testId);
        });
    });

    describe('When I try to share data and it fails', function () {
        it('shows an error message in the url field', function () {
            httpBackend.when('POST', 'rest/share/upload').respond(500, '');
            httpBackend.expectPOST('rest/share/upload');
            scope.share();
            httpBackend.flush();
            expect(scope.model.shareURL).toEqual('ERROR');
        });
    });



});