var oauth;
var uuidGenerator;

$(document).ready(function() {
  console.log("- refactoring uuid")
  uuidGenerator = new UUIDGenerator()
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
      console.log('Given Name: ' + gProfile.givenName())
      console.log('Image URL: ' + gProfile.imageUrl())
      console.log('Email: ' + gProfile.email())

      var gSheet = new GSheets('1bsPVDw_DKoByu3_y8bn3pQ_VAF8Mr8QJA5pcZIZATpI')
      gSheet.append([ [uuidGenerator.generate(), new Date()] ])

    
	});

	

	$('#btn-consent-proposal-agree').click(function(){
  		console.log(uuidGenerator.generate())
  	});

});