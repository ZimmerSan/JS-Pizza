/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Storage = require('../Storage');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігається перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    var unique = true;
    Cart.forEach(function(item){
        if(item.pizza.id === pizza.id && item.size === size){
            item.quantity++;
            unique = false;
        }
    });

    if(unique)
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });

    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    Cart = $.grep(Cart, function(value) {
        return value.pizza.id != cart_item.pizza.id || value.size != cart_item.size;
    });

    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його

    var savedPizza = Storage.get("cart");
    if(savedPizza) Cart = savedPizza;

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику

    $cart.html("");
    $(".footer .summ").text(0);
    var totalPrice = 0;

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);
        totalPrice += cart_item.quantity * cart_item.pizza[cart_item.size].price;
        $(".footer .summ").text(totalPrice);
        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function(){
            cart_item.quantity -= 1;
            if(cart_item.quantity <= 0) removeFromCart(cart_item);
            updateCart();
        });

        $node.find(".remove").click(function(){
            removeFromCart(cart_item);
            updateCart();
        });

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);

    $("#booked-number").text(Cart.length);

    Storage.set("cart", Cart);
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;