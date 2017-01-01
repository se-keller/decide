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
      var consent = createConsent(function(consent){

        consent.accept(new Profile().email)
        consentRepository.persist(consent, function(){
          share(consent)  
        })  
      }) 
    }
	});

	$('#btn-consent-proposal-agree').click(function(){
    if(!$('#btn-consent-proposal-accept').hasClass("disabled")) {
      var consent = createConsent(function(consent){
        consent.agree(new Profile().email)
        consentRepository.persist(consent, function(){
          share(consent)  
        })  
      })
    }
  });
});


function createConsent(callback) { 
  var profile = new Profile()
  profileRepository.persist(profile, function(){
    var consent = new Consent()
    consent.creatorEMail = profile.email
    consent.uuid = uuidGenerator.generate()
    consent.currentDecision = $('#txtarea-consent-proposal').val()
    consent.creationDate = new Date()
    callback(consent)
  })
}

function share(consent) {
  window.location.href = 'share.html?id=' + consent.uuid
}