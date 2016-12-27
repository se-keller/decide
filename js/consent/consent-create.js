var oauth;
var uuidGenerator;

$(document).ready(function() {
  console.log("- create consent refactoring")
  uuidGenerator = new UUID()
	oauth = new OAuth(
    'AIzaSyDbR2kJv9QUCbSRPOPt3R7v31NCquDEz7w',
    '847560978980-gj7ac8oo7h5spk4uupdko3j865aon6hu.apps.googleusercontent.com'
    )
  oauth.login()

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
    var consent = createConsent()
    consent.accept()
    persist(consent)
    share(consent)
	});

	$('#btn-consent-proposal-agree').click(function(){
    var consent = createConsent()
    consent.agree()
    persist(consent)
    share(consent)
  });
});

function createConsent() { 
  var gProfile = new GProfile()
  var consent = new Consent()
  consent.creatorEMail = gProfile.email()
  consent.uuid = uuidGenerator.generate()
  consent.currentDecision = $('#txtarea-consent-proposal').val()
  consent.creationDate = new Date()
  return consent
}

function persist(consent) {
  var gSheet = new GSheets('1bsPVDw_DKoByu3_y8bn3pQ_VAF8Mr8QJA5pcZIZATpI')
  gSheet.append([ [consent.uuid, consent.creationDate, consent.creatorEMail, JSON.stringify(consent)] ])
}

function share(consent) {
  window.location.href = 'share.html?id=' + consent.uuid
}