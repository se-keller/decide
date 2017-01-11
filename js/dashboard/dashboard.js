$(document).ready(function() {

  login.isLoggedIn(function(loggedIn){
    if(loggedIn) {
    	var profile = new Profile()
        refreshNavigation(profile)
        consentRepository.findConsents(profile.email, function(consents){
        	createConsentsTable(consents)
        })
    } else {
      window.location.href = 'index.html?login=dashboard.html'
    }
  })

})