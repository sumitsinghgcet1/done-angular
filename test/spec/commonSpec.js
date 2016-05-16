'use strict';

	describe('Common script Tests', function () {
		beforeEach(module('storeClientApp'));

		describe('Testing the Pizza functionality in common utility script', function(){
			beforeEach(function () {
				jasmine.getFixtures().fixturesPath = 'base/test/spec/javascripts/fixtures/';
				loadFixtures('pizzasFixture.html');
			});

			it('test that clicking of Add Pizza button triggers the modal show', function () {
				var spyEvent = spyOnEvent('#pizzaModal', 'show.bs.modal');
				// Click the Add Pizza button
				$('#addpizzabutton').trigger('click');

				// Test whether the modal's show event got triggered
				expect('show.bs.modal').toHaveBeenTriggeredOn('#pizzaModal');
				expect(spyEvent).toHaveBeenTriggered();
			});

			it('test that clicking of Add Pizza button brings up the correct content in modal dialog', function () {
				var spyEvent = spyOnEvent('#pizzaModal', 'show.bs.modal');
				// Click the Add Pizza button
				$('#addpizzabutton').trigger('click');
				expect($('#pizzaModal .modal-title')).toHaveText('Add Pizza');
				expect($('#pizzaModal .modal-body input#pizza-name')).toHaveValue('');
				expect($('#pizzaModal .modal-body input#pizza-price')).toHaveValue('');
				expect($('#pizzaModal .modal-footer button#savebutton')).toBeVisible();
				expect($('#pizzaModal .modal-footer button#editbutton')).toBeHidden();
			});

			it('test that clicking of Edit Pizza button triggers the modal show', function () {
				var spyEvent = spyOnEvent('#pizzaModal', 'show.bs.modal');

				$('#editpizzabutton').trigger('click');
				expect('show.bs.modal').toHaveBeenTriggeredOn('#pizzaModal');
				expect(spyEvent).toHaveBeenTriggered();
			});

			it('test that clicking of Edit Pizza button brings up the correct content in modal dialog', function () {
				$('#editpizzabutton').click();
				expect($('#pizzaModal .modal-title')).toHaveText('Edit Pizza');
				expect($('#pizzaModal .modal-footer button#editbutton')).toBeVisible();
				expect($('#pizzaModal .modal-footer button#savebutton')).toBeHidden();
			});
		});

		describe('Testing the Order functionality in common utility script', function(){
			beforeEach(function () {
				jasmine.getFixtures().fixturesPath = 'base/test/spec/javascripts/fixtures/';
				loadFixtures('ordersFixture.html');
			});

			it('test that clicking of Add Order button triggers the modal show', function () {
				var spyEvent = spyOnEvent('#orderModal', 'show.bs.modal');
				// Click the Add Pizza button
				$('#addorderbutton').click();

				// Test whether the modal's show event got triggered
				expect('show.bs.modal').toHaveBeenTriggeredOn('#orderModal');
				expect(spyEvent).toHaveBeenTriggered();
			});

			it('test that clicking of Edit Order button triggers the modal show', function () {
				var spyEvent = spyOnEvent('#orderModal', 'show.bs.modal');

				$('#editorderbutton').click();
				expect('show.bs.modal').toHaveBeenTriggeredOn('#orderModal');
				expect(spyEvent).toHaveBeenTriggered();
			});

			it('test that clicking of Add Order button brings up the correct content in modal dialog', function () {
				$('#addorderbutton').click();

				expect($('#orderModal .modal-title')).toHaveText('Add Order');
				expect($('#orderModal .modal-footer button#savebutton')).toBeVisible();
				expect($('#orderModal .modal-footer button#editbutton')).toBeHidden();
			});

			it('test that clicking of Edit Order button brings up the correct content in modal dialog', function () {
				$('#editorderbutton').click();

				expect($('#orderModal .modal-title')).toHaveText('Edit Order');
				expect($('#orderModal .modal-footer button#editbutton')).toBeVisible();
				expect($('#orderModal .modal-footer button#savebutton')).toBeHidden();
			});
		});
	});