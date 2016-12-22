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

}