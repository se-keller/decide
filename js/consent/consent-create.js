$(document).ready(function() {

console.log("oauth ready");
      // Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com
      var CLIENT_ID = '847560978980-gj7ac8oo7h5spk4uupdko3j865aon6hu.apps.googleusercontent.com';

      var SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

      /**
       * Check if current user has authorized this application.
       */
      function checkAuth() {
        console.log("check Auth");
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
      }

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      function handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          loadSheetsApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
      }

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      function handleAuthClick(event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      }

      /**
       * Load Sheets API client library.
       */
      function loadSheetsApi() {
        var discoveryUrl =
            'https://sheets.googleapis.com/$discovery/rest?version=v4';
        gapi.client.load(discoveryUrl).then(function() {console.log("Loaded")});

      }





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