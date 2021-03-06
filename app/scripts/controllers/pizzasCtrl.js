'use strict';

/**
 * @ngdoc function
 * @name storeClientApp.controller:PizzasCtrl
 * @description
 * # PizzasCtrl
 * Controller of the storeClientApp
 */
 angular.module('storeClientApp').controller('PizzasCtrl', function ($scope, dataFactory, ruleService, pizzaRules) {
  $scope.isGrid = 1;
  $scope.entityList = [];
  $scope.errors = 0;
  $scope.show = 0;

  //Set current selected Pizza
  $scope.setPizzaId = function(pizzaId){
    $scope.pizzaId = pizzaId;
  };

  //Populate modal with pizza selected
  $scope.populateSelectedPizzaDetails = function(){
    $scope.clearState();
    for (var i in $scope.entityList){
      if ($scope.entityList[i].id === $scope.pizzaId){
        $scope.selectedbase = $scope.entityList[i].base.id;
        $scope.selectedbasename = $scope.entityList[i].base.name;
        $scope.newpizzaprice = $scope.entityList[i].price;
        $scope.newpizzaname = $scope.entityList[i].name;
        for (var obj in $scope.entityList[i].toppings){
          $scope.currentPizzaToppings.push($scope.entityList[i].toppings[obj].id);
        }
      }
    }
    angular.forEach($scope.allToppingsList, function(topping){
      for (var p in $scope.currentPizzaToppings) {
        if ($scope.currentPizzaToppings[p] === topping.id){
          topping.selected = true;
        }
      }
    });
  };


  //Clear state
  $scope.clearState = function(){
    $scope.currentPizzaToppings = [];
    $scope.selectedbase = '';
    $scope.selectedbasename = '';
    $scope.newpizzaname = '';
    $scope.newpizzaprice = '';
  };

  //Get all pizzas
  $scope.getPizzaList = function (){
    $scope.entityList = [];
    dataFactory.findAll('pizzas').then(
        function(response){
          $scope.entityList = response.data;
        },
        function(){
          $scope.show = 1;
          $scope.OutputLabel = "Unable to get all pizzas";
        }
      );
  };

  $scope.getPizzaList();


  //Get all toppings
  $scope.loadAllToppings = function(){
    $scope.allToppingsList = [];
    dataFactory.findAll('toppings').then(
      function(response){
        $scope.allToppingsList = response.data;
        $scope.populateSelectedPizzaDetails();
      });
  };

  //Get all bases for drop down
  $scope.loadAllBases = function(){
    $scope.allBasesList = [];
    dataFactory.findAll('bases').then(
      function(response){
        $scope.allBasesList = response.data;
      });
  };

 //Save Pizza - New and existing
 $scope.savePizza = function(edit){
    var newName = $scope.newpizzaname;
    var newPrice = $scope.newpizzaprice;
    var newBase = $scope.selectedbase;
    var newBaseName = $scope.selectedbasename;
    var id = $scope.pizzaId;
    var newToppings = [];

    angular.forEach($scope.allToppingsList, function(topping){
      if (topping.selected){
        newToppings.push('{ "id": "' + topping.id + '", "name": "' + topping.name +'"}');
      }
    });

    var JSONString = '{' +
      ((edit) ? '"id": "' + id + '",' : '') +
      '"name": "' + newName + '",' +
      '"price": "' + newPrice + '",' +
      '"base": {"id": "' + newBase + '", "name": "' + newBaseName + '"}, ' +
      '"toppings": [' +  newToppings.join() + ']' +
      '}';

    var data = JSON.parse(JSONString);
    
    var errorMessage = ruleService.validatePizzaMandatoryElements(data);
    if (errorMessage){
      $scope.error = 1;
      $scope.saveError = errorMessage;
      return;
    }
    if (edit) {
      dataFactory.editEntity('pizzas', id, data).then(
      function(){
        $scope.getPizzaList();
      });
    }
    else {
      dataFactory.addEntity('pizzas', data).then(
      function(){
        $scope.getPizzaList();
      });
    }
    $scope.show = 1;
    $scope.OutputLabel = "Pizza saved successfully";
    $scope.closeModal();
  };

  //close model
  $scope.closeModal = function () {
    $scope.error = 0;
    $scope.clearState();
    $('#pizzaModal').modal('hide');
  };

 });
