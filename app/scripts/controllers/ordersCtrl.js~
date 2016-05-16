'use strict';

/**
 * @ngdoc function
 * @name storeClientApp.controller:ordersCtrl
 * @description
 * # OrdersCtrl
 * Controller of the storeClientApp
 */
 angular.module('storeClientApp').controller('OrdersCtrl', function ($scope, dataFactory, ruleService){
    $scope.isGrid = 1;
    $scope.entityList = [];
    $scope.pizzaToAddList = [];
    $scope.show = 0;
    $scope.error = 0;

    $scope.setOrderId = function (orderId){
        $scope.orderId = orderId;
    };

    $scope.getOrderList = function(){
        dataFactory.findAll('orders').then(
        function(response){
            $scope.entityList = response.data;
        },
        function (){
            $scope.show = 1;
            $scope.OutputLabel = "Unable to get orders";
        });
    };

    $scope.getOrderList();

    $scope.deleteOrder = function(){
        var orderIdToBeDeleted = $scope.orderId;
        dataFactory.deleteEntity('orders', orderIdToBeDeleted).then(
            function() {
                $scope.getOrderList();
                $scope.show = 1;
                $scope.OutputLabel = "Order deleted successfully";
            },
            function (){
                $scope.show = 1;
                $scope.OutputLabel = "Unable to delete orders";
            });
    };

    $scope.loadAllPizzas = function(){
        dataFactory.findAll('pizzas').then(
            function(response){
                $scope.pizzaToAddList = response.data;
                $scope.selectExistingPizzas();
            });
    };

    $scope.selectExistingPizzas = function(){
        $scope.clearState();
        var selectedOrder;
        for (var i in $scope.entityList){
            if ($scope.entityList[i].id === $scope.orderId){
                selectedOrder = $scope.entityList[i];
            }
            break;
        }
        $scope.selectedOrderPizzas = selectedOrder.pizzas;
        angular.forEach($scope.pizzaToAddList, function(pizza){
            for (var p in $scope.selectedOrderPizzas){
                if (pizza.id === $scope.selectedOrderPizzas[p].id) {
                    pizza.selected = true;
                }
            }
        });
    };

    $scope.clearState = function(){
        $scope.selectedOrderPizzas = [];
    };

    $scope.saveOrder = function(edit){
        var existingId = $scope.orderId;
        var orderPrice = 0.0;
        var selectedPizzas = [];
        angular.forEach($scope.pizzaToAddList, function(pizza){
            if (pizza.selected) {
                orderPrice = orderPrice + pizza.price;
                selectedPizzas.push('{"id": "' + pizza.id + '"}');
            }
        });
        var JSONString = '{ "totalPrice": "' + orderPrice + '",' +
                        ((edit) ? '"id": "' + existingId + '",': '') +
                        '"pizzas": [' + selectedPizzas.join() + ']}';
        var data = JSON.parse(JSONString);
        var errorMessage = ruleService.vaidatePizzaOrderMandatoryElements(data);
        if (errorMessage){
          $scope.error = 1;
          $scope.saveError = errorMessage;
          return;
        }
        if (edit) {
            dataFactory.editEntity('orders', existingId, data).then(
            function(){
                $scope.getOrderList();
            });
        }
        else {
            dataFactory.addEntity('orders', data).then(
            function(){
                $scope.getOrderList();
            });
        }
        $scope.show = 1;
        $scope.OutputLabel = "Order saved successfully";
        $scope.closeModal();
    };

    //close model
    $scope.closeModal = function () {
      $scope.error = 0;
      $scope.clearState();
      $('#orderModal').modal('hide');
    };
 });
