$(function() {

	loadInfos("GTFS/stop_times.txt").done(function(data){
		console.log(typeof data);
	});
	
	$("#infos_passage").append(dataTime.toSource());

});


// Load file
function loadInfos(file)
{
    var infos = $.get(file, function(data) {


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