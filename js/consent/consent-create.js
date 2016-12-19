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
  	checkAuth();
  	gapi.client.sheets.spreadsheets.values.append({
          spreadsheetId: '1bsPVDw_DKoByu3_y8bn3pQ_VAF8Mr8QJA5pcZIZATpI',
          range: 'Sheet1!A:Z',
          valueInputOption: 'USER_ENTERED',
          values: [ [generateUUID()] ]
    }).then(function(response) {
		console.log('Values Set');
	}, function(response) {
		console.log('Error: ' + response.result.error.message);
	});
  });
  $('#btn-consent-proposal-agree').click(function(){
  	console.log(generateUUID())
  });
});