$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var ValidateForm = require('./ValidateForm');
    var API = require('./API');
    var googleMaps = require('./GoogleMaps')

    API.getPizzaList(function (err, pizza_list) {
        if(err) { return console.error(err); }
        PizzaCart.initialiseCart();
        PizzaMenu.initialiseMenu(pizza_list);
    });

    if(window.location.pathname === "/order.html") googleMaps.initialise();

    var $filter_buttons = $(".inner-navbar");

    $filter_buttons.find("a").click(function(){
        PizzaMenu.filterPizza(this.id);
        $filter_buttons.find("a").each(function(i, item){
            $(item).removeClass("btn-success");
        });
        $(this).addClass("btn-success");
    });

    $(".right-panel .clear").click(function(){
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
});