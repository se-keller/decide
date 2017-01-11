function OAuth() {
 
  var authorized = true
  var authInstance = undefined

  this.login = function(callback, noLoginCallback) {
    initAuthInstance(function() {
      var signedIn = authInstance.isSignedIn.get();
        if(!signedIn) {
          authInstance.signIn().then(
            function(response){
              console.log("Log in successful")
              callback()
            }, function(response){
              console.log('Could not log in')
              noLoginCallback()
            });
        } else {
          callback()
        }
    })
  }

  var initAuthInstance = function(callback) {
    if(authInstance === undefined) {
      gapi.load('client:auth2', function(){
        gapi.client.init({
          apiKey: DECIDE_GOOGLE_API_KEY,
          discoveryDocs: DECIDE_GOOGLE_API_DISCOVERY_DOCS,
          clientId: DECIDE_GOOGLE_API_CLIENT_ID,
          scope: DECIDE_GOOGLE_API_SCOPES
        }).then(function () {
          authInstance = gapi.auth2.getAuthInstance()
          callback()
        })  
      })
    } else {
      callback()
    }
    
  }

  this.logout = function(callback) {
    initAuthInstance(function(){
      var signedIn = authInstance.isSignedIn.get();
        if(signedIn) {
          authInstance.signOut().then(
            function(response){
              console.log("Log out successful")
              callback()
            }, function(response){
              console.log('Could not log out')
              noLoginCallback()
            });
        } else {
          callback()
        }
    })
  }

 /* this.logout = function(callback) {
    instance.isLoggedIn(function(isLoggedIn) {
      if(isLoggedIn) {
          gapi.auth2.getAuthInstance().signOut().then(
            function(response){
              console.log("Log out successful")
              callback()
            }, function(response){
              console.log('Could not log out')
              noLoginCallback()
            });
        } else {
          callback()
        }
    })


  }*/

  this.isLoggedIn = function(loggedIn) {
    gapi.load('auth2', function(){
      gapi.auth2.init({
        client_id: DECIDE_GOOGLE_API_CLIENT_ID
      }).then(function () {
        var signedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
        loggedIn(signedIn)
      });  
    });
  }

  
}
