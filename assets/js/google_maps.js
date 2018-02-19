var map, infoWindow, beaches;

var mapImage = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

function addRestaurant(lat,lng){
    $("#addRestaurantModal").modal();
    $("#lat").val(lat);
    $("#lon").val(lng);
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.9, lng: 151.2},
        zoom: 10
    });
    infoWindow = new google.maps.InfoWindow;


    google.maps.event.addListener(map, 'click', function(event) {
        addRestaurant(event.latLng.lat(),event.latLng.lng())
    });


    google.maps.event.addListener(map, 'dragend', function() {
        $('#addReview').hide();
        $('#streetView').hide();
        $('.navigation-search').val('').trigger('input');
    })


    // Data for the markers consisting of a name, a LatLng and a zIndex for the
    // order in which these markers should display on top of each other.
    $.getJSON( "assets/restaurants.json", function( data ) {
        // beaches = data;
        beaches = [];

        data.forEach(function(restaurant){
            addNewRestaurant(restaurant);
        })

        setMarkers(map);
    }).success(function(data){
            jsonLoaded(data);
        }
    ).fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
        setMarkers(map);
    });


    // We get the map's default panorama and set up some defaults.
    // Note that we don't yet set it visible.




    // Try HTML5 geolocation.
    if (navigator.geolocation) {

        //https://stackoverflow.com/questions/32329464/chrome-navigator-geolocation-getcurrentposition-error-403
        //THIS MAY FAIL
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

var panorama;

function showStreetView(lat,lon) {

    panorama = map.getStreetView();

    panorama.setPosition({lat: lat, lng: lon});
    panorama.setPov(({
        heading: 265,
        pitch: 0,
        zoom: 1
    }));

    panorama.setVisible(true);
}

function hideStreetView() {

    if (typeof panorama !== 'undefined') {
        // the variable is defined
        panorama.setVisible(false);
    }
}

function addMarker(lat,lon,name, id){

    var image = {
        url: mapImage,
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
    };

    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
    };

    var marker = new google.maps.Marker({
        position: {lat: lat, lng: lon},
        map: map,
        icon: image,
        shape: shape,
        title: name,
        id: id
    });

    //Add marker listener
    google.maps.event.addListener(marker, "click", function (event) {
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();
        goTolocationId(this.id);

    }); //end addListener
}

function setMarkers(map) {

    for (var i = 0; i < beaches.length; i++) {
        var beach = beaches[i];
        addMarker(beach.lat,beach.lng,beach.name,beach.id);
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {

    var err = browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.';

    console.log("Request Failed:",err);

    /* Notice Geolocation woks only on https
    *  https://developers.google.com/web/updates/2016/04/geolocation-on-secure-contexts-only
    */
    return false;
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}