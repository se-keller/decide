function GSheets(spreadsheetId) {

	this.append = function(sheet, values, successCallback) {
		gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: spreadsheetId,
            range: sheet + '!A:Z',
            valueInputOption: 'USER_ENTERED',
            values: values
          }).then(function(response) {
            console.log("Success")
            successCallback()
          }, function(response) {
            console.log('Error: ' + response.result.error.message);
          });
	}

  this.update = function(sheet, row, values, successCallback) {
    gapi.client.sheets.spreadsheets.values.update({
            spreadsheetId: spreadsheetId,
            range: sheet + '!A'+row+':Z'+row,
            valueInputOption: 'USER_ENTERED',
            values: values
          }).then(function(response) {
            console.log("Success")
            successCallback()
          }, function(response) {
            console.log('Error: ' + response.result.error.message);
          });
  }

	this.findRow = function(sheet, column, value, foundCallback, notFoundCallback) {
		gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: spreadsheetId,
          range: sheet + '!A:Z',
        }).then(function(response) {
          var range = response.result;
          if(range.values === undefined) {
            notFoundCallback()
            return
          } else if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
              var row = range.values[i];
              if(row[column] === value) {
                var gSheetRowNo = i+1
              	foundCallback(row, gSheetRowNo)
              	return
              }
            }
          } 
          notFoundCallback()
        }, function(response) {
          	console.log('Error: ' + response.result.error.message);
        });
	}

  this.allRows = function(sheet, callback) {
    var rows = []
    gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: spreadsheetId,
          range: sheet + '!A:Z',
        }).then(function(response) {
          var range = response.result;
          if(range.values === undefined) {
            console.log('no rows found')
            callback(rows)
            return
          } else if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
              var row = range.values[i];
              rows.push(row)
              console.log('row found')
            }
          } 
          callback(rows)
        }, function(response) {
            console.log('Error: ' + response.result.error.message);
        });
  }

}