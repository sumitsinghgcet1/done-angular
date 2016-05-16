'use strict';

describe('Pizza Controller Tests', function () {

  // load the controller's module
  beforeEach(function(){
    module('storeClientApp');
  });

  describe('Testing the getPizza method in Pizza Controller', function () {
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
      $controller('PizzasCtrl', {
        $scope: $scope,
        dataFactory: dataFactory
      });

      $scope.getPizzaList();
    }));

    it ("test getPizzaList when pizzas are successfully retrieved", function(){
      // Setup the data we wish to return for the .then function in the controller
      var data = JSON.parse('{"data": [{"id": 1,"name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}}, {"id": 2,"name": "Supreme", "Price": "2000", "base": {"id": 1,"name": "Pan"}}]}');
      deferred.resolve(data);
      $scope.$digest();
      expect($scope.entityList).not.toBe(undefined);
      expect($scope.entityList.length).toBe(2);
      expect($scope.show).toBe(0);
    });

    it('test getPizzaList when dataFactory service rejects promise', function () {
      //This will result in an error in the controller
      deferred.reject();
      $scope.$digest();

      expect($scope.show).toBe(1);
      expect($scope.OutputLabel).toBe('Unable to get all pizzas');
    });

  });

  describe('Testing the savePizza method in Pizza Controller', function () {
    var $scope;
    var $q;
    var deferredAdd;
    var deferredGet;
    var deferredEdit;

    beforeEach(function(){
      module('storeClientApp');
    });

    beforeEach(inject(function(_$rootScope_, _$q_, $controller, dataFactory){
      $q = _$q_;
      $scope = _$rootScope_.$new();

      deferredAdd = _$q_.defer();
      deferredGet = _$q_.defer();
      deferredEdit = _$q_.defer();
      spyOn(dataFactory, 'addEntity').and.returnValue(deferredAdd.promise);
      spyOn(dataFactory, 'editEntity').and.returnValue(deferredEdit.promise);
      spyOn(dataFactory, 'findAll').and.returnValue(deferredGet.promise);

      $controller('PizzasCtrl', {
        $scope: $scope,
        dataFactory: dataFactory
      });
    }));

    it('test savePizza when a new Pizza is valid and promise is resolved', function () {
      $scope.newpizzaname = 'Supreme';
      $scope.newpizzaprice = '1000.0';
      $scope.selectedbase = '1';
      $scope.selectedbasename = 'Pan';
      $scope.allToppingsList = JSON.parse('[{"id":1,"name":"Onion", "selected": "true"},{"id":2,"name":"Tomato", "selected": "true"},{"id":3,"name":"Cheese", "selected": "true"}]');
      $scope.savePizza(false);

      var dataGet = JSON.parse('{"data": [{"id": 1,"name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}}, {"id": 2,"name": "Supreme", "Price": "2000", "base": {"id": 1,"name": "Pan"}}]}');

      var dataAdd = JSON.parse('{' +
      '"id": "1",' +
      '"name": "Supreme",' +
      '"price": "1000.0",' +
      '"base": {"id": "1", "name": "Pan"},' +
      '"toppings": [{"id":1,"name":"Onion"},{"id":2,"name":"Tomato"},{"id":3,"name":"Cheese"}]' +
      '}');
      deferredAdd.resolve(dataAdd);
      deferredGet.resolve(dataGet);
      $scope.$digest();
      expect($scope.OutputLabel).toBe('Pizza saved successfully');
    });

    it('test savePizza when an existing Pizza is updated and promise is resolved', function () {
      $scope.newpizzaname = 'Supreme';
      $scope.newpizzaprice = '1000.0';
      $scope.selectedbase = '1';
      $scope.selectedbasename = 'Pan';
      $scope.allToppingsList = JSON.parse('[{"id":1,"name":"Onion", "selected": "true"},{"id":2,"name":"Tomato", "selected": "true"},{"id":3,"name":"Cheese", "selected": "true"}]');
      $scope.savePizza(true);

      var dataGet = JSON.parse('{"data": [{"id": 1,"name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}}, {"id": 2,"name": "Supreme", "Price": "2000", "base": {"id": 1,"name": "Pan"}}]}');

      var dataEdit = JSON.parse('{' +
        '"id": "1",' +
        '"name": "Supreme",' +
        '"price": "1000.0",' +
        '"base": {"id": "1", "name": "Pan"},' +
        '"toppings": [{"id":1,"name":"Onion"},{"id":2,"name":"Tomato"},{"id":3,"name":"Cheese"}]' +
      '}');
      deferredAdd.resolve(dataEdit);
      deferredGet.resolve(dataGet);
      $scope.$digest();
      expect($scope.OutputLabel).toBe('Pizza saved successfully');
    });
  });

  describe('testing loadAllToppings, loadAllBases, clearState methods', function () {
    var $scope;
    var $q;
    var deferred; 

    beforeEach(function(){
      module('storeClientApp');
    });

    beforeEach(inject(function(_$rootScope_, _$q_, dataFactory, $controller){
      $scope = _$rootScope_.$new();
      $q = _$q_;
      deferred = $q.defer();
      spyOn(dataFactory, 'findAll').and.returnValue(deferred.promise);
      $controller('PizzasCtrl', {
        $scope: $scope, 
        dataFactory: dataFactory
      });
    }));

    it ("test loadAllToppings when promise is resolved", function(){
      var data = JSON.parse('{"data":[{"id":1,"name":"Onion"},{"id":2,"name":"Tomato"},{"id":3,"name":"Cheese"}]}');
      $scope.loadAllToppings();
      deferred.resolve(data);
      $scope.$digest();
      expect($scope.allToppingsList.length).toBe(3);
    });

    it ("test loadAllBases when promise is resolved", function(){
      var data = JSON.parse('{"data":[{"id":1,"name":"Thin"},{"id":2,"name":"Thick"}]}');
      $scope.loadAllBases();
      deferred.resolve(data);
      $scope.$digest();
      expect($scope.allBasesList.length).toBe(2);
    });

    it ("test clearState and all state should be cleared", function(){
      $scope.clearState();
      expect($scope.currentPizzaToppings.length).toBe(0);
      expect($scope.selectedbase).toBe('');
      expect($scope.selectedbasename).toBe('');
      expect($scope.newpizzaname).toBe('');
      expect($scope.newpizzaprice).toBe('');
    });

    it ("test populateSelectedPizzaDetails and the correct pizza should be populated in the state", function(){
      $scope.entityList = JSON.parse('[{' +
        '"id": "1",' +
        '"name": "Supreme",' +
        '"price": "1000.0",' +
        '"base": {"id": "1", "name": "Pan"},' +
        '"toppings": [{"id":1,"name":"Onion"},{"id":2,"name":"Tomato"}]' +
      '}]');
      $scope.pizzaId = '1';
      $scope.allToppingsList = JSON.parse('[{"id":1,"name":"Onion"},{"id":2,"name":"Tomato"},{"id":3,"name":"Cheese"}]');
      $scope.populateSelectedPizzaDetails();
      expect($scope.currentPizzaToppings.length).toBe(2);
      expect($scope.selectedbase).toBe('1');
      expect($scope.selectedbasename).toBe('Pan');
      expect($scope.newpizzaname).toBe('Supreme');
      expect($scope.newpizzaprice).toBe('1000.0');
    });

    it ("test setPizzaId", function(){
      $scope.setPizzaId('1');
      expect($scope.pizzaId).toBe('1');
    });

  });

});