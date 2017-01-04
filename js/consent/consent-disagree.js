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
    console.log("profile found")
    $('#img-consent-disagree-creator').attr('src', profile.imageUrl)
    var urlParamsDecoder = new UrlParamsDecoder(window.location.href)
  	if(urlParamsDecoder.hasParam('id')) {
   		var id = urlParamsDecoder.valueOf('id')
      consentRepository.find(id, function(consent) {
      	console.log("consent found")
      	disagreeConsent = consent
      })
  	}
  })

  $('#txtarea-consent-disagree-proposal').on('input propertychange paste', function() {
    disableOn($('#txtarea-consent-disagree-reason').val()==="" || $('#txtarea-consent-disagree-proposal').val()==="", 
      ['#btn-consent-proposal-disagree-accept',
      '#btn-consent-proposal-disagree-agree'])
	});

  $('#txtarea-consent-disagree-reason').on('input propertychange paste', function() {
    disableOn($('#txtarea-consent-disagree-reason').val()==="" || $('#txtarea-consent-disagree-proposal').val()==="", 
      ['#btn-consent-proposal-disagree-accept',
      '#btn-consent-proposal-disagree-agree'])
	});
  
	$('#btn-consent-proposal-disagree-accept').click(function(){
    if(isEnabled('#btn-consent-proposal-disagree-accept')) {
      	consent.disagree(profile.email, $('#txtarea-consent-disagree-proposal').text(), $('#txtarea-consent-disagree-reason').text())
        consent.accept(profile.email, $('#txtarea-consent-proposal').val())
        consentRepository.persist(consent, function(){
            window.location.href = 'consent-participate.html?id=' + consent.uuid
        })  
    }
	});

	$('#btn-consent-proposal-disagree-agree').click(function(){
    if(isEnabled('#btn-consent-proposal-disagree-accept')) {
	    	consent.disagree(profile.email, $('#txtarea-consent-disagree-proposal').text(), $('#txtarea-consent-disagree-reason').text())
	        consent.agree(profile.email, $('#txtarea-consent-proposal').val())
	        consentRepository.persist(consent, function(){
	          window.location.href = 'consent-participate.html?id=' + consent.uuid
	        })  
    	}
  	});

  	$('#btn-consent-disagree-proposal-cancel').click(function(){
    	window.location.href = 'consent-participate.html?id=' + consent.uuid
 	})

}