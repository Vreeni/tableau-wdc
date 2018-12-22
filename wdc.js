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
            id: "test",
            alias: "Test",
            dataType: tableau.dataTypeEnum.string
     
        }];

        var tableSchema = {
            id: "TestData_earthquakeFeed",
            alias: "Earthquakes with magnitude greater than 4.5 in the last seven days",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
$.getJSON("p2ops.json", function(json) {

            var feat = json.types;
		var featOne = feat.schema
			var featTwo = featOne.simpleType,
                tableData = [];
            // Iterate over the JSON object
            for (var i = 0, len = featTwo.length; i < len; i++) {
                tableData.push({
                    "id": featTwo[i].id,
		    "test": featTwo[i]['@name']
                  
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
    });
})();
