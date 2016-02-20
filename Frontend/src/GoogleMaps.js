function initialize() {
//Тут починаємо працювати з картою
    var mapProp = {
        center: new google.maps.LatLng(50.464379, 30.519131),
        zoom: 11
    };
    var point = new google.maps.LatLng(50.464379, 30.519131);

    var html_element = document.getElementById("googleMap");
    var map = new google.maps.Map(html_element, mapProp);

    google.maps.event.addDomListener(window, 'load', initialize);

    var marker = new google.maps.Marker({
        position: point,
        map: map,
        icon: "assets/images/map-icon.png"
    });

    var destMarker = new google.maps.Marker({
        position: null,
        map: map,
        icon: "assets/images/home-icon.png"
    });

    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions( { suppressMarkers: true } );

    google.maps.event.addListener(map, 'click', function (me) {
        var coordinates = me.latLng;
        geocodeLatLng(coordinates, function (err, address) {
            if (!err) {
                displayRoute(coordinates);
                $('#inputAddress').val(address);
            } else {
                console.log("Немає адреси")
            }
        })
    });

    var delay = (function(){
        var timer = 0;
        return function(callback, ms){
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
        };
    })();

    $('#inputAddress').keyup(function() {
        delay(function (){
            geocodeAddress($('#inputAddress').val(), function (err, coordinates) {
                if (!err) {
                    displayRoute(coordinates);
                } else {
                    console.log("Немає адреси");
                }
            })
        }, 1500 );
    });

    function displayRoute(coordinates){
        calculateRoute(point, coordinates, function (err, response){
            if(!err){
                directionsDisplay.setDirections(response);
                var leg = response.routes[0].legs[0];
                destMarker.setPosition(leg.end_location);
                $('.order-summary-address span').text(leg.end_address);
                $('.order-summary-time span').text(leg.duration.text);
            } else {
                console.log("Cannot calculate route");
            }
        });
    }
}

function geocodeLatLng(latlng, callback) {
    //Модуль за роботу з адресою
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'location': latlng}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK && results[1]) {
            var address = results[1].formatted_address;
            callback(null, address);
        } else {
            callback(new Error("Can't find address"));
        }
    });
}

function geocodeAddress(address, callback) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
            var coordinates = results[0].geometry.location;
            callback(null, coordinates);
        } else {
            callback(new Error("Can	not	find the address"));
        }
    });
}

function calculateRoute(A_latlng, B_latlng, callback) {
    var directionService = new google.maps.DirectionsService();
    directionService.route({
        origin: A_latlng,
        destination: B_latlng,
        travelMode: google.maps.TravelMode["DRIVING"]
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            callback(null, response);
        } else {
            callback(new Error("Can't find direction"));
        }
    });
}

exports.initialise = initialize;
exports.geocodeLatLng = geocodeLatLng;
exports.geocodeAddress = geocodeAddress;
//exports.calculateRoute = calculateRoute;