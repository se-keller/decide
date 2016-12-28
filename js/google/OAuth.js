function OAuth() {
 
  var authorized = true;

  this.login = function() { 
    gapi.load('client:auth2', function(){
      gapi.client.init({
        apiKey: decide.google.api.key,
        discoveryDocs: decide.google.api.discovery.docs,
        clientId: decide.google.api.client.id,
        scope: decide.google.api.scopes
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
