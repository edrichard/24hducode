<<<<<<< HEAD
$(function(){
	LoadInfos("GTFS/stops.txt").done(function(data){
		//console.log(typeof data);
		
		var obj = jQuery.parseJSON( data );
		console.log(obj);
		
		
});

// Load file
function LoadInfos(file)
{
    var infos = $.get(file, function(data) {

        var result = new Array(); // My list of table
        var listItem = new Array(); // My item list
        var list; // My list of details
        
        // Foreach line...
        $.each(data.split('\n'), function(i, d) {
            
            // If it's my first line with my list of id
            if (i == 0) {
                $.each(d.split(','), function(j, item) {
                    listItem.push(item);
                });
            } else {
                list = {};
                $.each(d.split(','), function(j, detail) {
                    //list.push(detail);
                    var col = listItem[j]; 
                    list[col] = detail;
                });
                result.push(list);
            }
        });
        return result;
    });
    return infos;
}
=======
$(function() {

    loadInfos("GTFS/stops.txt").done(function(data){
        data = parseGTFS(data);
    });

});


function parseGTFS(data) {
    var result = new Array(); // My list of table
    var listItem = new Array(); // My item list
    var list; // My list of details
    
    // Foreach lign...
    $.each(data.split('\n'), function(i, d) {
        
        // If it's my first lign with my list of id
        if (i == 0)
        {
            $.each(d.split(','), function(j, item) {
                listItem.push(item);
            });

        }
        else
        {
            list = {};
            $.each(d.split('","'), function(j, detail) {

                var col = listItem[j]; 
                list[col] = detail;

            });
            result.push(list);
        }
    });
    return result;
}


// Load file
function loadInfos(file)
{
    return $.get(file);
}
>>>>>>> 72807bee2c8ac03488b4cedeecdb3238991de3de
