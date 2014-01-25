$(document).ready(  function()
	{
		$.ajax( {
	        type: "GET",
	        url: "Fichier.xml",
	        dataType: "xml",
	        success: function(xml) { }
	    });
	}
);  