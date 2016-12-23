var oauth;
var uuidGenerator;

$(document).ready(function() {
  console.log("- fill 1")
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
		  
      var gProfile = new GProfile()
      var email = gProfile.email()
      var uuid = uuidGenerator.generate()
      var proposal = $('#txtarea-consent-proposal').val()
      var consent = new Consent(email, proposal)
      consent.accept()

      var gSheet = new GSheets('1bsPVDw_DKoByu3_y8bn3pQ_VAF8Mr8QJA5pcZIZATpI')
      gSheet.append([ [uuid, new Date(), email, JSON.stringify(consent)] ])

    
	});

	

	$('#btn-consent-proposal-agree').click(function(){
  		console.log(uuidGenerator.generate())
  	});

});