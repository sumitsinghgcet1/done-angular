'use strict';

describe('Service: RuleService', function () {

  // load the controller's module
  beforeEach(module('storeClientApp'));

  var ruleService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_ruleService_ ) {
    ruleService = _ruleService_;
  }));

  it ("should return an error when a blank base name is passed in", function(){
    var errorMessage = ruleService.validateBaseMandatoryElements('');
    expect(errorMessage).toBe('New Base name cannot be blank');
  });

  it ("should not return an error when a valid base name is passed in", function(){
    var errorMessage = ruleService.validateBaseMandatoryElements('Thin');
    expect(errorMessage).toBe('');
  });

  it ("should return an error when a blank topping name is passed in", function(){
    var errorMessage = ruleService.validateToppingMandatoryElements('');
    expect(errorMessage).toBe('New Topping name cannot be blank');
  });

  it ("should not return an error when a valid topping name is passed in", function(){
    var errorMessage = ruleService.validateToppingMandatoryElements('Pineapple');
    expect(errorMessage).toBe('');
  });


  it ("should not return an error when a valid pizza is passed", function(){
    var JSONString = '{' +
      '"id": "1",' +
      '"name": "Veggie",' +
      '"price": "1000.0",' +
      '"base": {"id": "1", "name": "Thin"},' +
      '"toppings": [{"id": "1", "name": "Pineapple"}]' +
      '}';
    var pizza = JSON.parse(JSONString);
    var errorMessage = ruleService.validatePizzaMandatoryElements(pizza);
    expect(errorMessage).toBe('');
  });


  it ("should return an error when a blank pizza is passed", function(){
      var JSONString = '{' +
        '"id": "1",' +
        '"name": "",' +
        '"price": "1000.0",' +
        '"base": {"id": "1", "name": "Thin"},' +
        '"toppings": [{"id": "1", "name": "Pineapple"}]' +
        '}';
      var pizza = JSON.parse(JSONString);
      var errorMessage = ruleService.validatePizzaMandatoryElements(pizza);
      expect(errorMessage).toBe('Pizza name cannot be blank');
  });

  it ("should return an error when a blank price is passed", function(){
      var JSONString = '{' +
        '"id": "1",' +
        '"name": "Veggie",' +
        '"price": "",' +
        '"base": {"id": "1", "name": "Thin"},' +
        '"toppings": [{"id": "1", "name": "Pineapple"}]' +
        '}';
      var pizza = JSON.parse(JSONString);
      var errorMessage = ruleService.validatePizzaMandatoryElements(pizza);
      expect(errorMessage).toBe('Pizza price cannot be blank');
  });

  it ("should return an error when a invalid pizza is passed", function(){
      var errorMessage = ruleService.validatePizzaMandatoryElements(undefined);
      expect(errorMessage).toBe('Invalid Pizza Object');
  });

  it ("should return an error when a base is not provided in the pizza", function(){
      var JSONString = '{' +
        '"id": "1",' +
        '"name": "Veggie",' +
        '"price": "1000.0",' +
        '"toppings": [{"id": "1", "name": "Pineapple"}]' +
        '}';
      var pizza = JSON.parse(JSONString);
      var errorMessage = ruleService.validatePizzaMandatoryElements(pizza);
      expect(errorMessage).toBe('Pizza base has to be specified');
  });

  it ("should return an error when the pizza has no toppings", function(){
      var JSONString = '{' +
        '"id": "1",' +
        '"name": "Veggie",' +
        '"price": "1000.0",' +
        '"base": {"id": "1", "name": "Thin"}' +
        '}';
      var pizza = JSON.parse(JSONString);
      var errorMessage = ruleService.validatePizzaMandatoryElements(pizza);
      expect(errorMessage).toBe('Pizza needs to have atleast 1 topping');
  });

  it ("should return an error when the order has no pizzas", function(){
      var JSONString = '{ "totalPrice": "2000.0","id": "1" }';
      var order = JSON.parse(JSONString);
      var errorMessage = ruleService.validatePizzaOrderMandatoryElements(order);
      expect(errorMessage).toBe('Order needs to have atleast one pizza');
  });

});
