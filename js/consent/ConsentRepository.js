function ConsentRepository() {
	var ID_COLUMN = 0;
	var JSON_OBJECT_COLUMN = 3;

	this.persist = function(consent, persistedCallback) {
  		var gSheet = new GSheets(DECIDE_REPOSITORY_GOOGLE_SPREADSHEET_ID)
  		gSheet.append('consents', [ [consent.uuid, consent.creationDate, consent.creatorEMail, JSON.stringify(consent)] ], function(){
  			persistedCallback()
  		})
	}

	this.find = function(id, callback) {
		var gSheet = new GSheets(DECIDE_REPOSITORY_GOOGLE_SPREADSHEET_ID)

    	gSheet.findRow('consents', ID_COLUMN, id, function(result){
    		callback(consentFromJSON(result[JSON_OBJECT_COLUMN]))
    	}, function(){
    		console.log('Consent decision not found')
    	})
	}

  var consentFromJSON = function(json) {
    var consentStruct = JSON.parse(json)
        
    consent = new Consent()
    consent.type = consentStruct.type
    consent.uuid = consentStruct.uuid
    consent.votes = consentStruct.votes

    return consent
  }
}