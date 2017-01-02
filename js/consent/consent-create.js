var uuidGenerator
var consentRepository
var profileRepository
var profile

$(document).ready(function() {
  uuidGenerator = new UUID()
  consentRepository = new ConsentRepository()
  profileRepository = new ProfileRepository()

	var login = new Login()
  login.login(function(){
    profile = new Profile()
  })

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
      var consent = createConsent(function(consent){

        consent.accept(profile.email, $('#txtarea-consent-proposal').val())
        consentRepository.persist(consent, function(){
          share(consent)  
        })  
      }) 
    }
	});

	$('#btn-consent-proposal-agree').click(function(){
    if(!$('#btn-consent-proposal-accept').hasClass("disabled")) {
      var consent = createConsent(function(consent){
        consent.agree(profile.email, $('#txtarea-consent-proposal').val())
        consentRepository.persist(consent, function(){
          share(consent)  
        })  
      })
    }
  });
});


function createConsent(callback) { 
  profileRepository.persist(profile, function(){
    var consent = new Consent()
    consent.creatorEMail = profile.email
    consent.uuid = uuidGenerator.generate()
    consent.creationDate = new Date()
    callback(consent)
  })
}

function share(consent) {
  window.location.href = 'share.html?id=' + consent.uuid
}