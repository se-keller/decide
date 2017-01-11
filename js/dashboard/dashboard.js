$(document).ready(function() {

  login.isLoggedIn(function(loggedIn){
    if(loggedIn) {
    	var profile = new Profile()
        refreshNavigation(profile)
        consentRepository.findConsents(profile.email, function(consents){
        	console.log(createConsentsTableBody(consents))
        })
    } else {
      window.location.href = 'index.html?login=dashboard.html'
    }
  })

})