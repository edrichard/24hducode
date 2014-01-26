$(function() {

    // Google map sur tout l'écran disponible
    var height_map = $(window).height() - ($('header').height()); // hauteur écran - hauteur titre
    $('#map-canvas').css('height', height_map);

    initialize();
    showArreteMarker();
    setZoom(16);
});

var map;
var infowindow;

function showArreteMarker() {
    loadInfos("GTFS/stops.txt").done(function(data) {
        data = parseGTFS(data);

        $.each(data, function(index, value) {
           // console.log(value['stop_lat']);
           
            var myLatlng = new google.maps.LatLng(value['stop_lat'], value['stop_lon']);
            var marker = new google.maps.Marker({
                position : myLatlng,
                map : map,
                title : value['stop_name']
            });
			

			//var nom = "Le nom de l'arret est :"+value['stop_name']+"!!!!";
	console.log(value['stop_id']);
			var contentString = '<div id="content">'+
				  '<div id="siteNotice">'+
				  '</div>'+
				  '<h1 id="firstHeading" class="firstHeading">Nom de l\'arret</h1>'+
				  '<div id="bodyContent" onclick="loadTrips('+value['stop_id']+')">'+
				  'pfhqpqpirubgfmqufbgpqudvn^qoruihgùsivhnqrihvùgsirhvqmruhglqduhvlgdfubvqmrunhvsfdvnqmrqfuvbqruvbqruvbqsmruvmr<hmsdigqmruhgfigq^rhgiifghsroh'+
				  '</div>'+
				  '</div>';

	   
	   

	  
		 infowindow = new google.maps.InfoWindow({
			  content: contentString
		  });
		  
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});
    });
});
}


function modif_content(data){
	infowindow.setContent(data);
}

function setZoom(zoom) {
    google.maps.event.addListener(map, 'zoom_changed', function() {
        map.setZoom(zoom);
        map.setCenter(marker.getPosition());
    });
}

function initialize() {
    var mapOptions = {
        zoom: 16
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    // HTML5 geolocation
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
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: content
    };
    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
}


function loadTrips(stop_id)
{
 loadInfos("GTFS/stop_times.txt").done(function(data) {
        data = parseGTFS(data);

        $.each(data, function(index, value) {

		
			if(value['stop_id'] == stop_id)
			{
				var mesDatas = "<p>Prochains départs : "+value['arrival_time']+"</p>";
				console.log(value['arrival_time']);
				modif_content(mesDatas);
			}
			
			
           

        });
    });

}


// Fonction permettant de savoir si l'heure passée en paramètre est déjà passée, ou pas.
// Paramètre : myTime : Fichier String du type "HH:MM:SS"
// Retourne true si l'heure passée en paramètre est déjà passée, et retourne false si l'heure passée en paramètre est déjà passée
function compareTime(myTime)
{
    // Récupération de ma date et mon heure actuelle
    now = new Date();
    // Récupération de la date et du jour actuel
    myDate = new Date();
    
    var elem = myTime.split(':');
    // Ajout de l'heure à myDate
    myDate.setHours(elem[0]);
    // Ajout des minutes
    myDate.setMinutes(elem[1]);
  
    //Comparaison
    if (myDate.getTime() > now.getTime())
    {
        // Ce bus n'est pas encore passé
        return true
    }
    else
    {
        return false
    }
}
