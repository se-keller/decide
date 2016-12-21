function OAuth() {

  var authorized = true;
  var CLIENT_ID = '847560978980-gj7ac8oo7h5spk4uupdko3j865aon6hu.apps.googleusercontent.com';
  var SCOPES = 'https://www.googleapis.com/auth/spreadsheets'
  var DISCOVERY_URL = 'https://sheets.googleapis.com/$discovery/rest?version=v4'
  var instance = this;

  this.authorize = function() {
    console.log("- 1")
    console.log(authorized)
      gapi.auth.authorize({
        client_id: CLIENT_ID, 
        scope: SCOPES, 
        immediate: authorized
      },
        handleAuthResult
      );
  }

  var handleAuthResult = function(authResult) {
    if(authResult && !authResult.error) {
      var discoveryUrl = DISCOVERY_URL;
        gapi.client.load(discoveryUrl).then(createConsent);
        authorized = true;
    } else {
      console.log(authResult.error);
      if(authorized) {
        authorized = false;
        instance.authorize();
      }
    }
  }

  createConsent = function() {
      gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: '1bsPVDw_DKoByu3_y8bn3pQ_VAF8Mr8QJA5pcZIZATpI',
            range: 'Sheet1!A:Z',
            valueInputOption: 'USER_ENTERED',
            values: [ [generateUUID(), new Date()] ]
          }).then(function(response) {
            console.log("Success")
          }, function(response) {
            console.log('Error: ' + response.result.error.message);
          });
    }

}