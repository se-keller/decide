function GSheets(spreadsheetId) {

	this.append = function(values) {
		gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: spreadsheetId,
            range: 'Sheet1!A:Z',
            valueInputOption: 'USER_ENTERED',
            values: values
          }).then(function(response) {
            console.log("Success")
          }, function(response) {
            console.log('Error: ' + response.result.error.message);
          });
	}

	this.findRow = function(column, value, callback) {
		gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: spreadsheetId,
          range: 'Sheet1!A:Z',
        }).then(function(response) {
          var range = response.result;
          var rowCount = range.values.length
          if (rowCount > 0) {
            for (i = 0; i < rowCount; i++) {
              var row = range.values[i];
              if(row[column] === value) {
              	callback(row)
              	return
              }
              	
            }
          } else {
            console.log('No data found.');
            callback([])
          }
        }, function(response) {
          	console.log('Error: ' + response.result.error.message);
        });
	}

}