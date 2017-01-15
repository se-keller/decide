var profile

$(document).ready(function() {

  login.isLoggedIn(function(loggedIn){
    if(loggedIn) {
     	profile = new Profile()
        refreshNavigation(profile)
        refreshDecisionsTable()
    } else {
      window.location.href = 'index.html?login=dashboard.html'
    }
  })

  

})

var ignoreConsent = function(id){
	consentRepository.ignoreConsent(id, profile.email, function() {
		refreshDecisionsTable()
	})
}

var refreshDecisionsTable = function() {
	consentRepository.findConsents(profile.email, function(consents){
		$('#tbl-consents').empty()
		$('#tbl-consents').append(createConsentsTableBody(consents))
     })
}