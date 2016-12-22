function OAuth(apiKey, clientId) {
 
  var authorized = true;
  var SCOPES = 'https://www.googleapis.com/auth/spreadsheets profile'
  var DISCOVERY_URL = ["https://sheets.googleapis.com/$discovery/rest?version=v4", "https://people.googleapis.com/$discovery/rest?version=v1"]
  var instance = this;
  console.log("- refactoring 2");

  this.start = function() {
    gapi.load('client:auth2', initClient);
  }

  var initClient = function() {
    gapi.client.init({
        apiKey: apiKey,
        discoveryDocs: DISCOVERY_URL,
        clientId: clientId,
        scope: SCOPES
    }).then(function () {
      var signedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
      if(!signedIn) {
        gapi.auth2.getAuthInstance().signIn().then(
          function(response){
            console.log("Log in successful")
            createConsent()
            getUserInfo()
          }, function(response){
            console.log('Could not log in')
          });
      } else {
        createConsent()
        getUserInfo()
      }
    });
  }

  var getUserInfo = function() {
    var gProfile = new GProfile()
    console.log('Given Name: ' + gProfile.givenName())
    console.log('Image URL: ' + gProfile.imageUrl())
    console.log('Email: ' + gProfile.email())
  }

  

  var createConsent = function() {
      var gSheet = new GSheets('1bsPVDw_DKoByu3_y8bn3pQ_VAF8Mr8QJA5pcZIZATpI')
      gSheet.append([ [generateUUID(), new Date()] ])
  }

}
