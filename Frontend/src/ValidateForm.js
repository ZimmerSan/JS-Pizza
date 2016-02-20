var API = require('./API');
var PizzaCart = require('./pizza/PizzaCart');

$( ".order-page-panel form input" ).keyup(function() {
    validateForm($(this));
});

$('.contact-form .next-step-button').click(function() {
    var res = true;
    $('.order-page-panel form input').each(function (i, item) {
        if( !validateForm($(item))) res = false;
    });

    if(res){
        var totalPrice = 0;
        PizzaCart.getPizzaInCart().forEach(function(cart_item){
            totalPrice += cart_item.quantity * cart_item.pizza[cart_item.size].price
        });
        API.createOrder({
            name: $('#inputName').val(),
            phone: $('#inputPhone').val(),
            address: $('#inputAddress').val(),
            pizza: PizzaCart.getPizzaInCart(),
            price: totalPrice
        }, function(err, result){
            if(err) {
                alert("Can't create order");
            } else {
                LiqPayCheckout.init({
                    data: result.data,
                    signature: result.signature,
                    embedTo: "#liqpay",
                    mode: "popup"
                }).on("liqpay.callback", function (data) {
                    console.log(data.status);
                    console.log(data);
                }).on("liqpay.ready", function (data) {
                }).on("liqpay.close", function (data) {
                });
            }
        });
    }
});

function validateForm(field){
    var id = field.attr('id');
    var val = field.val();
    var parent = field.parent().parent();
    switch (id) {
        case 'inputName':
            if(val.match(/\d+/g) || val.length === 0) {
                $('form .name-help-block').fadeIn();
                parent.removeClass('has-success').addClass('has-error');
                return false;
            } else {
                $('form .name-help-block').fadeOut();
                parent.addClass('has-success').removeClass('has-error');
            }
            break;
        case 'inputPhone':
            if(!val.match(/^(\+38)?0\d{9}$/)){
                $('form .phone-help-block').fadeIn();
                parent.removeClass('has-success').addClass('has-error');
                return false;
            } else {
                $('form .phone-help-block').fadeOut();
                parent.addClass('has-success').removeClass('has-error');
            }
            break;
        case 'inputAddress':
            if(val.length === 0){
                $('form .address-help-block').fadeIn();
                parent.removeClass('has-success').addClass('has-error');
                return false;
            } else {
                $('form .address-help-block').fadeOut();
                parent.addClass('has-success').removeClass('has-error');
            }
            break;
    }
    return true;
}

exports.validateForm = validateForm;