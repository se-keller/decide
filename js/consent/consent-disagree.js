var consentRepository
var profileRepository
var profile
var disagreeConsent

$(document).ready(function() {
	consentRepository = new ConsentRepository()
	profileRepository = new ProfileRepository()

	var login = new Login()
	login.login(function(){
	profile = new Profile()
	$('#img-consent-disagree-creator').attr('src', profile.imageUrl)
	var urlParamsDecoder = new UrlParamsDecoder(window.location.href)
		if(urlParamsDecoder.hasParam('id')) {
			var id = urlParamsDecoder.valueOf('id')
		  	consentRepository.find(id, function(consent) {
		  		disagreeConsent = consent
		  	})
		}
	})

  	$('#txtarea-consent-disagree-proposal').on('input propertychange paste', function() {
		disableOn($('#txtarea-consent-disagree-proposal').val()==="", 
	  		['#btn-consent-proposal-disagree-accept',
	  		'#btn-consent-proposal-disagree-agree'])
	})
  
	$('#btn-consent-disagree-proposal-accept').click(function(){
    	if(isEnabled('#btn-consent-disagree-proposal-accept')) {
	      	consent.disagree(profile.email, $('#txtarea-consent-disagree-proposal').text(), $('#txtarea-consent-disagree-reason').text())
	        consent.accept(profile.email, $('#txtarea-consent-disagree-proposal').val())
	        consentRepository.persist(consent, function(){
	            window.location.href = 'consent-participate.html?id=' + consent.uuid
	        })  
    	}
	})

	$('#btn-consent-disagree-proposal-agree').click(function(){
    	if(isEnabled('#btn-consent-disagree-proposal-agree')) {
	    	consent.disagree(profile.email, $('#txtarea-consent-disagree-proposal').text(), $('#txtarea-consent-disagree-reason').text())
	        consent.agree(profile.email, $('#txtarea-consent-disagree-proposal').val())
	        consentRepository.persist(consent, function(){
	          window.location.href = 'consent-participate.html?id=' + consent.uuid
	        })  
    	}
  	})

  	$('#btn-consent-disagree-proposal-cancel').click(function(){
    	window.location.href = 'consent-participate.html?id=' + consent.uuid
 	})
})