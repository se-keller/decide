function ConsentRepository() {
	var ID_COLUMN = 0;
	var JSON_OBJECT_COLUMN = 3;

	this.persist = function(consent, persistedCallback) {
  		var gSheet = new GSheets(DECIDE_REPOSITORY_GOOGLE_SPREADSHEET_ID)

      gSheet.findRow('consents', ID_COLUMN, id, function(result, row){
        // found just update
        gSheet.update('consents', row, [ [consent.uuid, consent.creationDate, consent.creatorEMail, JSON.stringify(consent)] ], function(){
          persistedCallback()
        })
      }, function(){
        // not found append
        gSheet.append('consents', [ [consent.uuid, consent.creationDate, consent.creatorEMail, JSON.stringify(consent)] ], function(){
          persistedCallback()
        })
      })

  		
	}

	this.find = function(id, foundCallback) {
		var gSheet = new GSheets(DECIDE_REPOSITORY_GOOGLE_SPREADSHEET_ID)

    	gSheet.findRow('consents', ID_COLUMN, id, function(result, row){
    		foundCallback(consentFromJSON(result[JSON_OBJECT_COLUMN]))
    	}, function(){
    		console.log('Consent decision not found')
        notFoundCallback()
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