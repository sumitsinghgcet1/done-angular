'use strict';

/**
 * @ngdoc service
 * @name storeClientApp.entityService
 * @description
 * # entityService
 * Factory in the storeClientApp.
 */

angular.module('storeClientApp').factory('dataFactory', ['$http', function ($http){
	var urlBase = 'http://localhost:8080/';
	var dataFactory = {};

	//Find All - Valid for all entities
	dataFactory.findAll = function(entity) {
		var promise = $http({method:'GET', url: urlBase + entity})
			.success(function (data) {
				return data;
			})
			.error(function () {
				return {'status': "Unable to get all bases"};
			});

		return promise;
	};

	//Add New - Valid for all entities
	dataFactory.addEntity = function(entity, data) {
		var promise = $http({method:'POST', url: urlBase + entity, data: data, headers: {'Content-Type': 'application/json'}})
			.success(function (data) {
				return data;
			})
			.error(function () {
				return {'status': "Entity could not be added"};
			});

		return promise;
	};

	//Edit existing entity - Only in case of Pizza and Order
	dataFactory.editEntity = function(entity, id, data) {
		var promise = $http({method: 'POST', url: urlBase + entity + '/' + id, data: data,
			headers: {'Content-Type': 'application/json'}})
		.success(function(data){
			return data;
		})
		.error(function(){
			return {'status': "Entity could not be edited"};
		});
		return promise;
	};

	//Delete existing entity - Only for Orders
	dataFactory.deleteEntity = function(entity, id){
		var promise = $http({method: 'DELETE', url: urlBase + entity + '/' + id,
			headers: {'Content-Type': 'application/json'}})
		.success(function(){
		})
		.error(function(){
			return {'status': "Entity could not be deleted"};
		});
		return promise;
	};

	return dataFactory;
}]);
