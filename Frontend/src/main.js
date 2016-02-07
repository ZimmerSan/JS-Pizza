/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();

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

});