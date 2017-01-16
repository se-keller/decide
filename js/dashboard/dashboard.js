var profile
var ignoreConsentId

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

  $('#btn-consent-ignore').click(function(){
    consentRepository.ignoreConsent(ignoreConsentId, profile.email, function() {
		refreshDecisionsTable()
		$('#modal-consent-ignore').modal('hide')
	})
  })

  $('#btn-consent-ignore-cancel').click(function(){
    $('#modal-consent-ignore').modal('hide')
  })
  
})

var ignoreConsent = function(id){
	ignoreConsentId = id
	$('#modal-consent-ignore').modal('show')
	
}

var refreshDecisionsTable = function() {
	consentRepository.findConsents(profile.email, function(consents){
		$('#tbl-consents').empty()
		$('#tbl-consents').append(createConsentsTableBody(consents))
     })
}