var oauth;

$(document).ready(function() {
	oauth = new OAuth(
    'AIzaSyDbR2kJv9QUCbSRPOPt3R7v31NCquDEz7w',
    '847560978980-gj7ac8oo7h5spk4uupdko3j865aon6hu.apps.googleusercontent.com'
    );

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
		oauth.start();
	});

	

	$('#btn-consent-proposal-agree').click(function(){
  		console.log(generateUUID())
  	});

});