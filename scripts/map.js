$(function() {
    initialize();
    showArreteMarker();
    setZoom(16);
});

var map;

function showArreteMarker() {
    loadInfos("GTFS/stops.txt").done(function(data) {
        data = parseGTFS(data);

        $.each(data, function(index, value) {
            
            var myLatlng = new google.maps.LatLng(value['stop_lat'], value['stop_lon']);
            new google.maps.Marker({
                position : myLatlng,
                map: map,
                title: 'Arrêt de bus'
            });

        });
    });
}

function setZoom(zoom) {
    google.maps.event.addListener(map, 'zoom_changed', function() {
        map.setZoom(zoom);
        map.setCenter(marker.getPosition());
    });
}

function initialize() {
    var mapOptions = {
        zoom : 16
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    // Try HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(48.103648, -1.672379);
            //var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            
            var infowindow = new google.maps.InfoWindow({
                map : map,
                position : pos,
                content : 'Vous êtes ici.'
            });

            map.setCenter(pos);
        }, function() {
            handleNoGeolocation(true);
        });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Erreur : Le service de géolocalisation n\'est pas disponible.';
    } else {
        var content = 'Erreur : Votre navigateur ne prend pas en charge la géolocalisation.';
    }

    var options = {
        map : map,
        position : new google.maps.LatLng(60, 105),
        content : content
    };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
}