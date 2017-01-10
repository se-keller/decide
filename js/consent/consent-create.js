var profile

$(document).ready(function() {

  login.login(function(){
    profile = new Profile()
    $('#img-consent-creator').attr('src', profile.imageUrl)
  })

	$('#txtarea-consent-proposal').on('input propertychange paste', function() {
    disableOn($('#txtarea-consent-proposal').val()==="", 
      ['#btn-consent-proposal-accept',
      '#btn-consent-proposal-agree'])
	});
  
	$('#btn-consent-proposal-accept').click(function(){
    if(isEnabled('#btn-consent-proposal-accept')) {
      var consent = createConsent(function(consent){
        consent.accept(profile.email, $('#txtarea-consent-proposal').val())
        consentRepository.persist(consent, function(){
          share(consent)  
        })  
      }) 
    }
	});

	$('#btn-consent-proposal-agree').click(function(){
    if(isEnabled('#btn-consent-proposal-accept')) {
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
    consent.uuid = uuidGenerator.generate()
    callback(consent)
  })
}

function share(consent) {
  window.location.href = 'share.html?id=' + consent.uuid
}