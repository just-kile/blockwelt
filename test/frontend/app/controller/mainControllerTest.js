describe('Main Controller', function () {

    var scope;
    var mainController;

    beforeEach(angular.mock.module("blockweltapp"));

    beforeEach(function() {
        inject(function($rootScope, $controller, $http, importService, $uibModal){
            scope=$rootScope.$new();


            mainController =$controller('MainController', {
                $scope: scope,
                $http: $http,
                importService: importService
            });
        })
    });

    describe('When I show example data', function () {

        it('sets progress to true', function () {
            mainController.showExampleData();
            expect(scope.model.progress).toEqual(true)
        })

    });

});