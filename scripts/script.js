$(document).ready(  function()
	{
		$.ajax( {
	        type: "GET",
	        url: "http://data.keolis-rennes.com/fileadmin/OpenDataFiles/GTFS/feed",
	        dataType: "xml",
	        success: function(xml) { }
	    });
	}
);  