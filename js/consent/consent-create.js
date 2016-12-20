$(document).ready(function() {

  $('#txtarea-consent-proposal').on('input propertychange paste', function() {
      if($('#txtarea-consent-proposal').val()==="") {
        $('#btn-consent-proposal-accept').addClass("disabled")
        $('#btn-consent-proposal-agree').addClass("disabled")  
      } else {
        $('#btn-consent-proposal-accept').removeClass("disabled")
        $('#btn-consent-proposal-agree').removeClass("disabled")  
      }
  });


  
	$('#btn-consent-proposal-accept').click(function(){
		authorize()
	});

	function authorize() {
		gapi.auth.authorize({
			client_id: '847560978980-gj7ac8oo7h5spk4uupdko3j865aon6hu.apps.googleusercontent.com', 
			scope: "https://www.googleapis.com/auth/spreadsheets", 
			immediate: false
		},
			handleAuthResult
		);
	}

 	function handleAuthResult(authResult) { 
 		if(authResult && !authResult.error) {
			var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
    		gapi.client.load(discoveryUrl).then(createConsent);
    	} else {
    		console.log(authResult.error);
    	}
  	}

	function createConsent() {
	  	gapi.client.sheets.spreadsheets.values.append({
	          spreadsheetId: '1bsPVDw_DKoByu3_y8bn3pQ_VAF8Mr8QJA5pcZIZATpI',
	          range: 'Sheet1!A:Z',
	          valueInputOption: 'USER_ENTERED',
	          values: [ [generateUUID(), new Date().getTime()] ]
	        }).then(function(response) {
	          console.log("Success")
	        }, function(response) {
	          console.log('Error: ' + response.result.error.message);
	        });
  	}

$('#btn-consent-proposal-agree').click(function(){
  	console.log(generateUUID())
  });

});