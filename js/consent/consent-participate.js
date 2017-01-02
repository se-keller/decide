var consentRepository

$(document).ready(function() {
  consentRepository = new ConsentRepository()
	var login = new Login()
	login.login(function(){
		var urlParamsDecoder = new UrlParamsDecoder(window.location.href)
  	if(urlParamsDecoder.hasParam('id')) {
     		var id = urlParamsDecoder.valueOf('id')
        consentRepository.find(id, function(consent) {
          $('#p-consent-participate-current-decision').html(consent.currentDecision().replace(/(?:\r\n|\r|\n)/g, '<br />'))
          $('#bdg-consent-participate-agree').text(consent.agreeCount())
          $('#bdg-consent-participate-accept').text(consent.acceptCount())
        })
  	} 
	})
})