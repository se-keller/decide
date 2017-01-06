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
		$.each(repository, function(index, values){
      if(values[column] === value) {
        return foundCallback(values)
      }
    })
    notFoundCallback()
	}

}