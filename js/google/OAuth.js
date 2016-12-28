function OAuth() {
 
  var authorized = true;
  var SCOPES = 'https://www.googleapis.com/auth/spreadsheets profile'
  var DISCOVERY_URL = ["https://sheets.googleapis.com/$discovery/rest?version=v4", "https://people.googleapis.com/$discovery/rest?version=v1"]

  this.login = function() {
    gapi.load('client:auth2', function(){
      gapi.client.init({
        apiKey: DECIDE_GOOGLE_API_KEY,
        discoveryDocs: DISCOVERY_URL,
        clientId: '847560978980-gj7ac8oo7h5spk4uupdko3j865aon6hu.apps.googleusercontent.com',
        scope: SCOPES
      }).then(function () {
        var signedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
        if(!signedIn) {
          gapi.auth2.getAuthInstance().signIn().then(
            function(response){
              console.log("Log in successful")
            }, function(response){
              console.log('Could not log in')
            });
        } 
      });  
    });
  }
}
