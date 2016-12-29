function ConsentRepository() {
	this.persist = function(consent) {
  		var gSheet = new GSheets(DECIDE_REPOSITORY_GOOGLE_SPREADSHEET_ID)
  		gSheet.append([ [consent.uuid, consent.creationDate, consent.creatorEMail, JSON.stringify(consent)] ])
	}

	this.find = function(id, callback) {
		var gSheet = new GSheets(DECIDE_REPOSITORY_GOOGLE_SPREADSHEET_ID)
    	gSheet.findRow(0, id, function(result){
    		var consent = JSON.parse(result[3])
        	callback(consent)
    	})
	}
}