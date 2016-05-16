'use strict';

describe('Factory: dataFactory', function () {

  // load the controller's module
  beforeEach(module('storeClientApp'));

  var dataFactory;
  var httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_dataFactory_, $httpBackend ) {
    dataFactory = _dataFactory_;
    httpBackend = $httpBackend;

    //FindAll
    httpBackend.when('GET', "http://localhost:8080/bases").respond(200, [{"id": 1,"name": "Pan"}, {"id": 2,"name": "Thick"}]);
    httpBackend.when('GET', "http://localhost:8080/toppings").respond(200, [{"id": 1,"name": "Pineapple"}, {"id": 2,"name": "Onion"}]);
    httpBackend.when('GET', "http://localhost:8080/pizzas").respond(200, [{"id": 1,"name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}}, {"id": 2,"name": "Supreme", "Price": "2000", "base": {"id": 1,"name": "Pan"}}]);
    httpBackend.when('GET', "http://localhost:8080/orders").respond(200, [{"id": 1, "totalPrice": 2000, pizzas: [{"id": 1,"name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}}]}]);
    httpBackend.when('GET', "http://localhost:8080/bases1").respond(404, undefined);
    httpBackend.when('GET', "http://localhost:8080/toppings1").respond(404, undefined);
    httpBackend.when('GET', "http://localhost:8080/pizzas1").respond(404, undefined);
    httpBackend.when('GET', "http://localhost:8080/orders1").respond(404, undefined);

    //AddEntity
    httpBackend.when('POST', "http://localhost:8080/bases", {"name": "Pan"}).respond(200, {"id": 1,"name": "Pan"});
    httpBackend.when('POST', "http://localhost:8080/toppings", {"name": "Thick"}).respond(200, {"id": 1,"name": "Thick"});
    httpBackend.when('POST', "http://localhost:8080/pizzas", {"name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}}).respond(200, {"id": 1, "name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}});
    httpBackend.when('POST', "http://localhost:8080/orders", {"totalPrice": 2000, pizzas: [{"id": 1,"name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}}]}).respond(200, {"id": 1, "totalPrice": 2000, pizzas: [{"id": 1,"name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}}]});

    //editEntity
    httpBackend.when('POST', "http://localhost:8080/pizzas/1", {"id": 1, "name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}}).respond(200, {"id": 1, "name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}});
    httpBackend.when('POST', "http://localhost:8080/orders/1", {"id": 1, "totalPrice": 2000, pizzas: [{"id": 1,"name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}}]}).respond(200, {"id": 1, "totalPrice": 2000, pizzas: [{"id": 1,"name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}}]});

    //Delete Entity
    httpBackend.when('DELETE', "http://localhost:8080/orders/1").respond(200, '');
  }));

  //Delete Entity
  it ("should be able to delete a pizza by calling deleteEntity", function(){
    dataFactory.deleteEntity('orders', 1).then(
      function (response){
        expect(response.status).toBe(200);
      }
    );
    httpBackend.flush();
  });

  //Edit Entity
  it ("should be able to edit a pizza by calling editEntity", function(){
    dataFactory.editEntity('pizzas', 1, {"id": 1, "name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}}).then(
      function (response){
        expect(response.status).toBe(200);
        expect(response.data.id).toBe(1);
      }
    );
    httpBackend.flush();
  });

  it ("should be able to edit an order by calling editEntity", function(){
    dataFactory.editEntity('orders', 1, {"id": 1, "totalPrice": 2000, pizzas: [{"id": 1,"name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}}]}).then(
      function (response){
        expect(response.status).toBe(200);
        expect(response.data.id).toBe(1);
      }
    );
    httpBackend.flush();
  });

  //AddEntity
  it ("should be able to add a base by calling addEntity", function(){
    dataFactory.addEntity('bases', {"name": "Pan"}).then(
      function (response){
        expect(response.status).toBe(200);
        expect(response.data.id).toBe(1);
      }
    );
    httpBackend.flush();
  });

  it ("should be able to add a topping by calling addEntity", function(){
    dataFactory.addEntity('toppings', {"name": "Thick"}).then(
      function (response){
        expect(response.status).toBe(200);
        expect(response.data.id).toBe(1);
      }
    );
    httpBackend.flush();
  });

  it ("should be able to add a pizza by calling addEntity", function(){
    dataFactory.addEntity('pizzas', {"name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}}).then(
      function (response){
        expect(response.status).toBe(200);
        expect(response.data.id).toBe(1);
      }
    );
    httpBackend.flush();
  });

  it ("should be able to add an order by calling addEntity", function(){
    dataFactory.addEntity('orders', {"totalPrice": 2000, pizzas: [{"id": 1,"name": "Veggie", "Price": "2000", "base": {"id": 1,"name": "Pan"}}]}).then(
      function (response){
        expect(response.status).toBe(200);
        expect(response.data.id).toBe(1);
      }
    );
    httpBackend.flush();
  });

  //find All
  it ("should return HTTP 200 and 2 bases when getting all the bases", function(){
    dataFactory.findAll('bases').then(
      function (response){
        expect(response.status).toBe(200);
        expect(response.data[0].id).toBe(1);
        expect(response.data.length).toBe(2);
      }
    );
    httpBackend.flush();
  });

  it ("should return HTTP 200 and 2 toppings when getting all the toppings", function(){
    dataFactory.findAll('toppings').then(
      function (response){
        expect(response.status).toBe(200);
        expect(response.data[0].id).toBe(1);
        expect(response.data.length).toBe(2);
      }
    );
    httpBackend.flush();
  });

  it ("should return HTTP 200 and 2 pizzas when getting all the pizzas", function(){
    dataFactory.findAll('pizzas').then(
      function (response){
        expect(response.status).toBe(200);
        expect(response.data.length).toBe(2);
      }
    );
    httpBackend.flush();
  });

  it ("should return HTTP 200 and 1 order when getting all the orders", function(){
    dataFactory.findAll('orders').then(
      function (response){
        expect(response.status).toBe(200);
        expect(response.data.length).toBe(1);
      }
    );
    httpBackend.flush();
  });

  it ("should return an HTTP 404 when a wrong entity type for base is passed", function(){
    var entityList = [];
    dataFactory.findAll('bases1').then(
      function (response){
      },
      function (error){
        expect(error.status).toBe(404);
      }
    );
    httpBackend.flush();
  });

  it ("should return an HTTP 404 when a wrong entity type for topping is passed", function(){
    var entityList = [];
    dataFactory.findAll('toppings1').then(
      function (response){
      },
      function (error){
        expect(error.status).toBe(404);
      }
    );
    httpBackend.flush();
  });

  it ("should return an HTTP 404 when a wrong entity type for order is passed", function(){
    var entityList = [];
    dataFactory.findAll('orders1').then(
      function (response){
      },
      function (error){
        expect(error.status).toBe(404);
      }
    );
    httpBackend.flush();
  });

  it ("should return an HTTP 404 when a wrong entity type for toppings is passed", function(){
    var entityList = [];
    dataFactory.findAll('toppings1').then(
      function (response){
      },
      function (error){
        expect(error.status).toBe(404);
      }
    );
    httpBackend.flush();
  });

});
