'use strict';

// Edit the Pizza
$('#pizzaModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var modal = $(this);

    if (button.text() !== "Add Pizza") {
        modal.find('.modal-footer button#savebutton').hide();
        modal.find('.modal-footer button#editbutton').show();
        modal.find('.modal-title').text("Edit Pizza");
    }
    else {
        modal.find('.modal-footer button#savebutton').show();
        modal.find('.modal-footer button#editbutton').hide();
        modal.find('.modal-title').text("Add Pizza");
    }
});

// Edit the Order
$('#orderModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var modal = $(this);

    if (button.text() !== "Add Order") {
        modal.find('.modal-footer button#savebutton').hide();
        modal.find('.modal-footer button#editbutton').show();
        modal.find('.modal-title').text("Edit Order");
    }
    else {
        modal.find('.modal-footer button#savebutton').show();
        modal.find('.modal-footer button#editbutton').hide();
        modal.find('.modal-title').text("Add Order");
    }
});
