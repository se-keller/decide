function ConsentRepository() {
	var ID_COLUMN = 0;
	var JSON_OBJECT_COLUMN = 1;
  var gSheet = new GSheets(DECIDE_REPOSITORY_GOOGLE_SPREADSHEET_ID)

	this.persist = function(consent, persistedCallback) {
      gSheet.findRow('consents', ID_COLUMN, consent.uuid, function(result, row){
        // found just update
        gSheet.update('consents', row, [ [consent.uuid, JSON.stringify(consent)] ], function(){
          persistedCallback()
        })
      }, function(){
        // not found append
        gSheet.append('consents', [ [consent.uuid, JSON.stringify(consent)] ], function(){
          persistedCallback()
        })
      })

  		
	}

	this.find = function(id, foundCallback, notFoundCallback) {
    	gSheet.findRow('consents', ID_COLUMN, id, function(result, row){
    		foundCallback(consentFromJSON(result[JSON_OBJECT_COLUMN]))
    	}, function(){
    		console.log('Consent decision not found')
        notFoundCallback()
    	})
	}

  this.findConsents = function(voter, callback) {
    var consents = []
    gSheet.allRows('consents', function(rows){
      $.each(rows, function(index, row){
        consent = consentFromJSON(row[JSON_OBJECT_COLUMN])
        if(consent.isParticipant(voter))
          consents.push(consent)
      })
    })
    callback(consents)
  }

  var consentFromJSON = function(json) {
    var consentStruct = JSON.parse(json)
        
    consent = new Consent()
    consent.type = consentStruct.type
    consent.uuid = consentStruct.uuid
    consent.votes = consentStruct.votes
    consent.participants = consentStruct.participants

    return consent
  }
}