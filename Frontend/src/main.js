/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var ValidateForm = require('./ValidateForm');
    var API = require('./API');

    API.getPizzaList(function (err, pizza_list) {
        if(err) { return console.error(err); }
        PizzaCart.initialiseCart();
        PizzaMenu.initialiseMenu(pizza_list);
    });

    var $filter_buttons = $(".inner-navbar");
    var $clear_button = $(".right-panel .clear");

    $filter_buttons.find("a").click(function(){
        PizzaMenu.filterPizza(this.id);
        $filter_buttons.find("a").each(function(i, item){
            $(item).removeClass("btn-success");
        });
        $(this).addClass("btn-success");
    });

    $clear_button.click(function(){
        PizzaCart.getPizzaInCart().forEach(function(item){
           PizzaCart.removeFromCart(item);
        });
    });

    $('.makeOrder').click(function(){
        window.location = "/order.html";
    });

    $('.editOrder').click(function(){
        window.location = "/";
    });

    $( ".order-page-panel form input" ).keyup(function() {
        ValidateForm.validateForm($(this));
    });

    $('.contact-form .next-step-button').click(function() {
        var res = true;
        $('.order-page-panel form input').each(function (i, item) {
            res = ValidateForm.validateForm($(item));
        });

        if(res)
            API.createOrder({
                name: $('#inputName').val(),
                phone: $('#inputPhone').val(),
                address: $('#inputAddress').val(),
                pizza: PizzaCart.getPizzaInCart()
            }, function(err, result){
                if(err) {
                    alert("Can't create order");
                } else {
                    window.location = "/order.html";
                    //alert("Order created");
                }
            });
    });

});