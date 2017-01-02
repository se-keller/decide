var consentRepository
var profile

$(document).ready(function() {
  
  

	var login = new Login()
	login.login(function(){

    profile = new Profile()
    consentRepository = new ConsentRepository()

		var urlParamsDecoder = new UrlParamsDecoder(window.location.href)
  	if(urlParamsDecoder.hasParam('id')) {
   		var id = urlParamsDecoder.valueOf('id')
      consentRepository.find(id, function(consent) {
        $('#p-consent-participate-current-decision').html(consent.currentProposal().replace(/(?:\r\n|\r|\n)/g, '<br />'))
        $('#bdg-consent-participate-agree').text(consent.agreeCount())
        $('#bdg-consent-participate-accept').text(consent.acceptCount())

        if(consent.hasAgreed(profile.email))
          $('#btn-consent-participate-agree').removeClass("disabled")
        else
          $('#btn-consent-participate-agree').addClass("disabled")

        if(consent.hasAccepted(profile.email))
          $('#btn-consent-participate-accept').removeClass("disabled")
        else
          $('#btn-consent-participate-accept').addClass("disabled")
      })
  	} 
	})
})