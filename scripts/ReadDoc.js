// FOnction permettant de parser un fichier .txt sous la norme GTFS
// Paramètre data : Lien vers le fichier .txt
// Retourne une liste de tableaux correspondant à chaque ligne
function parseGTFS(data) {
    var result = new Array(); // My list of table
    var listItem = new Array(); // My item list
    var list; // My list of details
    
    // Traitement pour chaque ligne du fichier
    $.each(data.split('\n'), function(i, d) {
        
        // Permet de récuperer les en-têtes
        if (i == 0)
        {
            $.each(d.split(','), function(j, item) {
                listItem.push(item);
            });

        }
        // Permet de récuperer les valeurs
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


// Permet le chargement du fichier en ajax
function loadInfos(file)
{
    return $.get(file);
}
