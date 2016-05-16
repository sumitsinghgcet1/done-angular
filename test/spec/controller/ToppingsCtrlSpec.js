'use strict';

describe('Topping Controller Tests', function () {

  // load the controller's module
  beforeEach(function(){
    module('storeClientApp');
  });

  describe('Testing the getToppingList method in Base Controller', function () {
    var $scope;
    var $q;
    var deferred;

    beforeEach(module('storeClientApp'));
    beforeEach(inject(function($controller, _$rootScope_, _$q_, dataFactory){
      $q = _$q_;
      $scope = _$rootScope_.$new();

      //We use the $q service to create a mock instance of defer
      deferred = _$q_.defer();

      //Use the Jasmine Spy to return deferred promise
      spyOn(dataFactory, 'findAll').and.returnValue(deferred.promise);

      //Init the controller passing our spy service instance
      $controller('ToppingsCtrl', {
        $scope: $scope,
        dataFactory: dataFactory
      });

      $scope.getToppingList();
    }));

    it ("test getBaseList when pizza bases are successfully retrieved", function(){
      // Setup the data we wish to return for the .then function in the controller
      var data = JSON.parse('{"data":[{"id":1,"name":"Onion"},{"id":2,"name":"Tomato"},{"id":3,"name":"Cheese"}]}');
      deferred.resolve(data);
      $scope.$digest();
      expect($scope.entityList).not.toBe(undefined);
      expect($scope.entityList.length).toBe(3);
      expect($scope.show).toBe(0);
    });

    it('test getBaseList when dataFactory service rejects promise', function () {
      //This will result in an error in the controller
      deferred.reject();
      $scope.$digest();

      expect($scope.show).toBe(1);
      expect($scope.OutputLabel).toBe('Unable to get all toppings');
    });

  });

  describe('Testing the saveTopping method in Topping Controller', function () {
    var $scope;
    var $q;
    var deferredAdd;
    var deferredGet;

    beforeEach(function(){
      module('storeClientApp');
    });

    beforeEach(inject(function(_$rootScope_, _$q_, $controller, dataFactory){
      $q = _$q_;
      $scope = _$rootScope_.$new();

      deferredAdd = _$q_.defer();
      deferredGet = _$q_.defer();
      spyOn(dataFactory, 'addEntity').and.returnValue(deferredAdd.promise);
      spyOn(dataFactory, 'findAll').and.returnValue(deferredGet.promise);

      $controller('ToppingsCtrl', {
        $scope: $scope,
        dataFactory: dataFactory
      });
    }));

    it('test saveTopping when newtoppingname is blank', function () {
      $scope.newbasename = '';
      $scope.saveTopping();
      expect($scope.error).toBe(1);
      expect($scope.saveError).toBe('New Topping name cannot be blank');
    });

    it('test saveTopping when newtoppingname is valid and promise is resolved', function () {
      $scope.newtoppingname = 'Pineapple';
      $scope.saveTopping();
      var dataAdd = JSON.parse('{"data":{"id":3,"name":"Pineapple"}}');
      var dataGet = JSON.parse('{"data":[{"id":1,"name":"Onion"},{"id":2,"name":"Cheese"}]}');
      deferredAdd.resolve(dataAdd);
      deferredGet.resolve(dataGet);
      $scope.$digest();
      expect($scope.OutputLabel).toBe('Topping saved successfully');
    });
    
  });
});