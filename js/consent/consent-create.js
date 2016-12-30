var uuidGenerator
var consentRepository
var profileRepository

$(document).ready(function() {
  uuidGenerator = new UUID()
  consentRepository = new ConsentRepository()
  profileRepository = new ProfileRepository()

	var login = new Login()
  login.login(function(){})

	$('#txtarea-consent-proposal').on('input propertychange paste', function() {
    if($('#txtarea-consent-proposal').val()==="") {
      $('#btn-consent-proposal-accept').addClass("disabled")
      $('#btn-consent-proposal-agree').addClass("disabled")  
    } else {
      $('#btn-consent-proposal-accept').removeClass("disabled")
      $('#btn-consent-proposal-agree').removeClass("disabled")  
    }
	});
  
	$('#btn-consent-proposal-accept').click(function(){
    if(!$('#btn-consent-proposal-accept').hasClass("disabled")) {
      

      var consent = createConsent()
      consent.accept()
      consentRepository.persist(consent)
      share(consent)  
    }
	});

	$('#btn-consent-proposal-agree').click(function(){
    if(!$('#btn-consent-proposal-accept').hasClass("disabled")) {
      var consent = createConsent()
      consent.agree()
      consentRepository.persist(consent)
      share(consent)
    }
  });
});

function createConsent() { 
  var profile = new Profile()
  profileRepository.persist(profile)
  
  var consent = new Consent()
  consent.creatorEMail = profile.email
  consent.uuid = uuidGenerator.generate()
  consent.currentDecision = $('#txtarea-consent-proposal').val()
  consent.creationDate = new Date()
  return consent
}

function share(consent) {
  window.location.href = 'share.html?id=' + consent.uuid
}