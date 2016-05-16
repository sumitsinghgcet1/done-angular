'use strict';

/**
 * @ngdoc function
 * @name storeClientApp.controller:ToppingsCtrl
 * @description
 * # ToppingsCtrl
 * Controller of the storeClientApp
 */
angular.module('storeClientApp')
  .controller('ToppingsCtrl', function ($scope, dataFactory, ruleService) {
      $scope.isGrid = 1;
      $scope.entityList = [];
      $scope.show = 0;
      $scope.error = 0;

      $scope.setToppingId = function (toppingId) {
          $scope.toppingId = toppingId;
      };

    $scope.getToppingList = function(){
      dataFactory.findAll('toppings').then(
        function (response) {
          $scope.show = 0;
          $scope.entityList = response.data;
        },
        function () {
          $scope.show = 1;
          $scope.OutputLabel = "Unable to get all toppings";
        });
    };

    $scope.getToppingList();

      // Add a Topping
      $scope.saveTopping = function () {
          var toppingName = $scope.newtoppingname;

          var errorMessage = ruleService.validateToppingMandatoryElements(toppingName);
          if (errorMessage){
            $scope.error = 1;
            $scope.saveError = errorMessage;
            return;
          }

          var data = JSON.parse('{' +
              '"name":"' + toppingName + '"}'
          );

          //Access the Topping service (change data in backend)
          dataFactory.addEntity('toppings', data).then(
          function (response) {
              // Update the model property
              $scope.entityList.push(response.data);
              $scope.show = 1;
              $scope.OutputLabel = 'Topping saved successfully';
              $scope.closeModal();
          });
          $scope.show = true;
      };

    //close model
    $scope.closeModal = function () {
      $scope.error = 0;
      $scope.newtoppingname = '';
      $('#toppingModal').modal('hide');
    };

  });
