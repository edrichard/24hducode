$(function() {
    initialize();
    showArreteMarker();
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

function initialize() {
    var mapOptions = {
        zoom : 10
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var pos = new google.maps.LatLng(48.103648, -1.672379);

    var infowindow = new google.maps.InfoWindow({
        map : map,
        position : pos,
        content : 'Vous êtes ici.'
    });
	


	
	
    map.setCenter(pos);

    // Try HTML5 geolocation
    /*if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(position) {
     var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

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
     }*/
			 // var dateNow = new Date().getTime();
			
			// Récupération de l'heure du départ du bus de l'arrêt
			 // var heureDepBus = "05:46:00";
			
			// Récupération de la date pour  la comparaison
			 // var jourSemDep = new Date().getDate();
			 // var moisDateDep = new Date().getMonth();
			 // var nomJourDateDep = new Date().getDay();
			 // var anneeDateDep = new Date().getFullYear();
			
			// var dateDep = jourSemDep+','+moisDateDep+' '+nomJourDateDep+' '+anneeDateDep+' '+heureDepBus;
			
			// Parsage en timestamp
			// / var dateDepTM = new Date(anneeDateDep, moisDateDep, jourSemDep ).getTime();
			// var dateDepTm = var Date(dateDep).getTime();
			
			// console.log(dateDepTM);
	
		// var mapBodyContent = document.getElementById('#bodyContent');
		// console.log(mapBodyContent);
		 // google.maps.event.addListener(mapBodyContent, 'click', function(){
			// infowindow.setContent("tralalala");
         // });
	
	
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

function compareDate(date1, date2){
	
}


