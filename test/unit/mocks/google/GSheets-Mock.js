function GSheets(spreadsheetId) {
  var repository = []

	this.append = function(sheet, values, successCallback) {
		repository.push(values)
    successCallback()
	}

  this.update = function(sheet, row, values, successCallback) {
    repository[row-1] = values
    successCallback()
  }

	this.findRow = function(sheet, column, value, foundCallback, notFoundCallback) {
    var found = false
		$.each(repository, function(index, values){
      if(values[0][column] === value) {
        found = true
        foundCallback(values[0], column)
      }
    })
    if(!found)
      notFoundCallback()
	}

  this.allRows = function(sheet, callback) {
    var rows = []
    $.each(repository, function(index, values){
      rows.push(values[0])
    })
    callback(rows)
  }

}