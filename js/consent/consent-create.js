var uuidGenerator;

$(document).ready(function() {
  uuidGenerator = new UUID()

        console.log(DECIDE_GOOGLE_API_KEY)
        console.log(DECIDE_GOOGLE_API_DISCOVERY_DOCS)
        console.log(DECIDE_GOOGLE_API_CLIENT_ID)
        console.log(DECIDE_GOOGLE_API_SCOPES)

	var oauth = new OAuth()
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
  var gSheet = new GSheets(DECIDE_REPOSITORY_GOOGLE_SPREADSHEET_ID)
  gSheet.append([ [consent.uuid, consent.creationDate, consent.creatorEMail, JSON.stringify(consent)] ])
}

function share(consent) {
  window.location.href = 'share.html?id=' + consent.uuid
}