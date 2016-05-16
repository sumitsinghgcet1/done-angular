'use strict';

/**
 * @ngdoc overview
 * @name storeClientApp
 * @description
 * # storeClientApp
 *
 * Main module of the application.
 */
angular
  .module('storeClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/bases.html',
        controller: 'BasesCtrl'
      }).
      when('/bases', {
        templateUrl: 'views/bases.html',
        controller: 'BasesCtrl'
      }).
      when('/toppings', {
        templateUrl: 'views/toppings.html',
        controller: 'ToppingsCtrl'
      }).
      when('/pizzas', {
        templateUrl: 'views/pizzas.html',
        controller: 'PizzasCtrl'
      }).
      when('/orders', {
        templateUrl: 'views/orders.html',
        controller: 'OrdersCtrl'
      });

    $locationProvider.html5Mode(false).hashPrefix('!');
  });
