function OAuth() {

  var authorized = true;
  var CLIENT_ID = '847560978980-gj7ac8oo7h5spk4uupdko3j865aon6hu.apps.googleusercontent.com';
  var SCOPES = 'profile https://www.googleapis.com/auth/spreadsheets'
  var DISCOVERY_URL = ["https://sheets.googleapis.com/$discovery/rest?version=v4", "https://people.googleapis.com/$discovery/rest?version=v1"]
  var API_KEY = 'AIzaSyDbR2kJv9QUCbSRPOPt3R7v31NCquDEz7w';
  var instance = this;
  console.log("- 1");

  this.start = function() {
    gapi.load('client:auth2', initClient);
  }

  var initClient = function() {
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_URL,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(function () {
      var signedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
      if(!signedIn)
        gapi.auth2.getAuthInstance().signIn().then(
          function(response){
            console.log("Success");
          }, function(response){
            console.log('Error: ' + response.result);
          });
    });
  }

  // ALTERNATIVE
  this.authorize = function() {
    
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
      var discoveryUrl = "https://sheets.googleapis.com/$discovery/rest?version=v4";
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