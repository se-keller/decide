function OAuth() {
 
  var authorized = true;

  this.login = function() {
    gapi.load('client:auth2', function(){
      gapi.client.init({
        apiKey: DECIDE_GOOGLE_API_KEY,
        discoveryDocs: DECIDE_GOOGLE_API_DISCOVERY_DOCS,
        clientId: DECIDE_GOOGLE_API_CLIENT_ID,
        scope: DECIDE_GOOGLE_API_SCOPES
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
