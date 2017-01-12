function ConsentRepository(gSheet) {
  var cache = {}
	var ID_COLUMN = 0;
	var JSON_OBJECT_COLUMN = 1;

	this.persist = function(consent, persistedCallback) {
      gSheet.findRow('consents', ID_COLUMN, consent.uuid, function(result, row){
        // found just update
        gSheet.update('consents', row, [ [consent.uuid, JSON.stringify(consent)] ], function(){
          cache[consent.uuid] = consent
          persistedCallback()
        })
      }, function(){
        // not found append
        gSheet.append('consents', [ [consent.uuid, JSON.stringify(consent)] ], function(){
          cache[consent.uuid] = consent
          persistedCallback()
        })
      })
	}

	this.find = function(id, foundCallback, notFoundCallback) {
      if(id in cache) {
        foundCallback(cache[id])
      } else {
        gSheet.findRow('consents', ID_COLUMN, id, function(result, row){
        var consent = consentFromJSON(result[JSON_OBJECT_COLUMN])
        cache[consent.uuid] = consent
        foundCallback(consent)
      }, function(){
        console.log('Consent decision not found')
        notFoundCallback()
      })  
      }
    	
	}

  this.findConsents = function(voter, callback) {
    var consents = []

    gSheet.allRows('consents', function(rows){
      $.each(rows, function(index, row){
        consent = consentFromJSON(row[JSON_OBJECT_COLUMN])
        console.log(consent)
        //if(consent.isParticipant(voter))
          consents.push(consent)
      })
    })
    console.log(consents)
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