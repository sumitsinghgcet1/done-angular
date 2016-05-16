'use strict';

/**
 * @ngdoc service
 * @name storeClientApp.entityService
 * @description
 * # entityService
 * Factory in the storeClientApp.
 */

angular.module('storeClientApp').service('ruleService', function (){
	//Validate whether basename is provided or not. 
	this.validateBaseMandatoryElements = function(newbasename) {
		var errorMessage = "";
		if (!newbasename) {
			errorMessage = "New Base name cannot be blank";
		}
		return errorMessage;
	};

	//Validate whether toppingname is provided or not. 
	this.validateToppingMandatoryElements = function(newtoppingname) {
		var errorMessage = "";
		if (!newtoppingname) {
			errorMessage = "New Topping name cannot be blank";
		}
		return errorMessage;
	};

	//Validate whether all mandatory elements in a new Pizza have been specified
	this.validatePizzaMandatoryElements = function(pizza) {
		var messages = [];
		if (!pizza) {
			messages.push("Invalid Pizza Object");
			return messages.join();
		}
		if (!pizza.name){
			messages.push("Pizza name cannot be blank");
		}
		if (!pizza.price){
			messages.push("Pizza price cannot be blank");
		}
		if (!pizza.base || (!pizza.base.id) || (pizza.base.id === 0)){
			messages.push("Pizza base has to be specified");
		}
		if (!pizza.toppings || pizza.toppings.length === 0){
			messages.push("Pizza needs to have atleast 1 topping");
		}
		return messages.join(", ");
	};


	//Validate whether the pizza order has atleast one pizza specified 
	this.vaidatePizzaOrderMandatoryElements = function (order){
		var messages = [];
		if (!order.pizzas || order.pizzas.length === 0) {
			messages.push("Order needs to have atleast one pizza");
		}
		return messages.join();
	};
});
