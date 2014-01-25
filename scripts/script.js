$(document).ready(function() {
	
	var xml = "feed.xml";
	
	$.ajax({
		type: "GET",
		url: xml,
		dataType: "application/atom+xml",
		success: function(xml){
			alert("ok");
		},
		error: function(xml){
			alert("ko");
		}
	});
		
	
	
	/*var stockFluxRss = [];
	var retourHtml = "";
	
	$.ajax({
		type: "GET",
		url: fluxRss,
		dataType: "xml",
		success: processusOK,
		error: processusKO
	});
		
	function processusOK(xml){
		$(xml).find('link').each(function(id,valeur){
			elemRss = {
					href:$(valeur).find('href').texte(),
					type:$(valeur).find('type').texte(),
					rel:$(valeur).find('rel').texte(),
					title:$(valeur).find('title').texte(),
					length:$(valeur).find('length').texte()
			}
			stockFluxRss(elemRss);
		});
		$.each(stockFluxRss, function(id, valeur){
			retourHtml += '<div class="flux"'+valeur.href+'</div>';
		})
		$('#xml').append(retourHtml);
	}
	
	function processusKO (xml, status, xhr) {
        console.log("---> "+status);
	}*/
});