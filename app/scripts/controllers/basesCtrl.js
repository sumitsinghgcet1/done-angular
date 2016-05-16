'use strict';

/**
 * @ngdoc function
 * @name storeClientApp.controller:BasesCtrl
 * @description
 * # BasesCtrl
 * Controller of the storeClientApp
 */

angular.module('storeClientApp')
  .controller('BasesCtrl', function ($scope, dataFactory, ruleService) {

    $scope.isGrid = 1;
    $scope.entityList = [];
    $scope.show = 0;
    $scope.error = 0;

    $scope.setBaseId = function (baseId) {
        $scope.baseId = baseId;
    };


    //Get All Bases
    $scope.getBaseList = function(){
      $scope.entityList = [];
      dataFactory.findAll('bases').then(
        function (response) {
          $scope.entityList = response.data;
        },
        function () {
          $scope.show = 1;
          $scope.OutputLabel = "Unable to get bases";
        }
      );
    };

    $scope.getBaseList();

    // Add a Base
    $scope.saveBase = function () {
      var baseName = $scope.newbasename;
      var errorMessage = ruleService.validateBaseMandatoryElements(baseName);
      if (errorMessage){
        $scope.error = 1;
        $scope.saveError = errorMessage;
        return;
      }
      var data = JSON.parse('{' +
          '"name":"' + baseName + '"}'
      );

      //Access the Base service (change data in backend)
      dataFactory.addEntity('bases', data).then(
      function () {
          // Refresh the bases
          $scope.getBaseList();
          $scope.closeModal();
          $scope.show = 1;
          $scope.OutputLabel = "Base saved successfully";
      });
    };

    //close model
    $scope.closeModal = function () {
      $scope.error = 0;
      $scope.newbasename = '';
      $('#baseModal').modal('hide');
    };

  });
