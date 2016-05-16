'use strict';

describe('Order Controller Tests', function () {

  // load the controller's module
  beforeEach(function(){
    module('storeClientApp');
  });

  describe('Testing the getOrderList method in Order Controller', function () {
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
      $controller('OrdersCtrl', {
        $scope: $scope,
        dataFactory: dataFactory
      });

      $scope.getOrderList();
    }));

    it ("test getOrderList when orders are successfully retrieved", function(){
      // Setup the data we wish to return for the .then function in the controller
      var data = JSON.parse('{"data": [{"id": 1, "totalPrice": 2000, "pizzas": [{"id": 1,"name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}}] }]}');
      deferred.resolve(data);
      $scope.$digest();
      expect($scope.entityList).not.toBe(undefined);
      expect($scope.entityList.length).toBe(1);
      expect($scope.show).toBe(0);
    });

    it('test getOrderList when dataFactory service rejects promise', function () {
      //This will result in an error in the controller
      deferred.reject();
      $scope.$digest();

      expect($scope.show).toBe(1);
      expect($scope.OutputLabel).toBe('Unable to get orders');
    });

  });

  describe('Testing the saveOrder method in Order Controller', function () {
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

      $controller('OrdersCtrl', {
        $scope: $scope,
        dataFactory: dataFactory
      });
    }));

    it('test saveOrder when a new order is valid and promise is resolved', function () {
      $scope.pizzaToAddList = JSON.parse('[{"id": 1,"name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}, "selected": true}]');
      $scope.saveOrder(false);
      var dataAdd = JSON.parse('{"data": {"id": 1, "totalPrice": 2000, "pizzas": [{"id": 1,"name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}}] }}');
      var dataGet = JSON.parse('{"data": [{"id": 1, "totalPrice": 2000, "pizzas": [{"id": 1,"name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}}] }]}');
      deferredAdd.resolve(dataAdd);
      deferredGet.resolve(dataGet);
      $scope.$digest();
      expect($scope.OutputLabel).toBe('Order saved successfully');
    });

    it('test saveOrder when an existing Order is updated and promise is resolved', function () {
      $scope.pizzaToAddList = JSON.parse('[{"id": 1,"name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}, "selected": true}]');
      $scope.saveOrder(true);
      var dataAdd = JSON.parse('{"data": {"id": 1, "totalPrice": 2000, "pizzas": [{"id": 1,"name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}}] }}');
      var dataGet = JSON.parse('{"data": [{"id": 1, "totalPrice": 2000, "pizzas": [{"id": 1,"name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}}] }]}');
      deferredAdd.resolve(dataAdd);
      deferredGet.resolve(dataGet);
      $scope.$digest();
      expect($scope.OutputLabel).toBe('Order saved successfully');
    });
  });

  describe('testing deleteOrder', function () {
    var $scope;
    var $q;
    var deferredDelete;
    var deferredGet;

    beforeEach(function(){
      module('storeClientApp');
    });

    beforeEach(inject(function(_$rootScope_, _$q_, dataFactory, $controller){
      $scope = _$rootScope_.$new();
      $q = _$q_;
      deferredDelete = $q.defer();
      deferredGet = $q.defer();
      spyOn(dataFactory, 'deleteEntity').and.returnValue(deferredDelete.promise);
      spyOn(dataFactory, 'findAll').and.returnValue(deferredGet.promise);
      $controller('OrdersCtrl', {
        $scope: $scope, 
        dataFactory: dataFactory
      });
    }));

    it ("test deleteOrder when promise is rejected", function(){
      $scope.orderId = 1;
      $scope.deleteOrder();
      deferredDelete.reject();
      $scope.$digest();
      expect($scope.OutputLabel).toBe('Unable to delete orders');
    });

    it ("test deleteOrder when promise is resolved", function(){
      $scope.orderId = 1;
      $scope.deleteOrder();
      deferredDelete.resolve();
      $scope.$digest();
      expect($scope.OutputLabel).toBe('Order deleted successfully');
    });

  });

  describe('testing loadAllPizzas, setOrderId, selectExistingPizzas and other small methods', function () {
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
      $controller('OrdersCtrl', {
        $scope: $scope, 
        dataFactory: dataFactory
      });
    }));

    it ("test loadAllPizzas when promise is resolved", function(){
      var data = JSON.parse('{"data": [{"id": 1,"name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}, "selected": true}]}');
      $scope.entityList = JSON.parse('[{"id": 1, "totalPrice": 2000, "pizzas": [{"id": 1,"name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}}] }]');
      $scope.orderId = 1;
      $scope.loadAllPizzas();
      deferred.resolve(data);
      $scope.$digest();
      expect($scope.pizzaToAddList.length).toBe(1);
    });

    it ("test clearState and all state should be cleared", function(){
      $scope.clearState();
      expect($scope.selectedOrderPizzas.length).toBe(0);
    });

    it ("test setOrderId", function(){
      $scope.setOrderId('1');
      expect($scope.orderId).toBe('1');
    });

  });

});