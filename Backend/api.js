var Pizza_List = require('./data/Pizza_List');
var crypto = require('crypto');

exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};

function base64(str) {
    return new Buffer(str).toString('base64');
}

function sha1(string) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}

exports.createOrder = function(req, res) {
    var order_info = req.body;
    //console.log("Creating Orders", order_info);

    var LIQPAY_PRIVATE_KEY='YZLuv3h9rFPZR2UmKn63qLbikHaUeJjtsYskQIii';
    var LIQPAY_PUBLIC_KEY='i61607420438';

    var pizza_desc = "";
    order_info.pizza.forEach(function(item){
        pizza_desc += '(' + item.quantity+ ' pcs.) ' + '[' + item.size + '] ' + item.pizza.title + '; ';
    });
    console.log(pizza_desc);

    var order = {
        version: 3,
        public_key: LIQPAY_PUBLIC_KEY,
        action: "pay",
        amount: req.body.price,
        currency: "UAH",
        description: order_info.name + '\n Address: ' + order_info.address + '\n Phone:' + order_info.phone + '\n Pizza: ' + pizza_desc,
        order_id: Math.random(),

        sandbox: 1
    };
    var data = base64(JSON.stringify(order));
    var signature = sha1(LIQPAY_PRIVATE_KEY + data + LIQPAY_PRIVATE_KEY);


    res.send({
        success: true,
        data: data,
        signature:signature
    });
};