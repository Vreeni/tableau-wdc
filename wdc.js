(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "id",
            alias: "name",
            dataType: tableau.dataTypeEnum.string
	}, {
            id: "mag",
            alias: "Mag",
            dataType: tableau.dataTypeEnum.string
     
        }];

        var tableSchema = {
            id: "Test_feed",
            alias: "Test feed",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
//$.getJSON("p2ops.json", function(json) {
  $.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson", function(resp) {
            var feat = resp.types;
		//var featOne = feat.schema
		//	var featTwo = featOne.simpleType,
                tableData = [];
            // Iterate over the JSON object
           // for (var i = 0, len = featTwo.length; i < len; i++) {
	  for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "id": feat[i].id,
		    "test": feat[i].mag
		   // "test": featTwo[i]['@name']
                  
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Test Data: USGS Earthquake Feed"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
 $("#inputFormn").click(function() {
            tableau.connectionName = "Test Data: USGS Earthquake Feed"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();


