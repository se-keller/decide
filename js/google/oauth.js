function OAuth() {

  var authorized = true;

  this.authorize = function() {
    console.log("- 1")
      gapi.auth.authorize({
        client_id: '847560978980-gj7ac8oo7h5spk4uupdko3j865aon6hu.apps.googleusercontent.com', 
        scope: "https://www.googleapis.com/auth/spreadsheets", 
        immediate: this.authorized
      },
        this.handleAuthResult
      );
  }

  this.handleAuthResult = function(authResult) {
    if(authResult && !authResult.error) {
      var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
        gapi.client.load(discoveryUrl).then(this.createConsent);
        this.authorized = true;
    } else {
      console.log(authResult.error);
      if(authorized) {
        this.authorized = false;
        this.authorize();
      }
      
    }
  }

  this.createConsent = function() {
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