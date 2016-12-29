function ConsentRepository() {
	var ID_COLUMN = 0;

	this.persist = function(consent) {
  		var gSheet = new GSheets(DECIDE_REPOSITORY_GOOGLE_SPREADSHEET_ID)
  		gSheet.append('consent', [ [consent.uuid, consent.creationDate, consent.creatorEMail, JSON.stringify(consent)] ])
	}

	this.find = function(id, callback) {
		var gSheet = new GSheets(DECIDE_REPOSITORY_GOOGLE_SPREADSHEET_ID)

    	gSheet.findRow('consent', ID_COLUMN, id, function(result){
    		var consent = JSON.parse(result[3])
        	callback(consent)
    	})
	}
}