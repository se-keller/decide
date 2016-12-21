var oauth;

$(document).ready(function() {
	oauth = new OAuth();

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
		oauth.authorize();
	});

	

	$('#btn-consent-proposal-agree').click(function(){
  		console.log(generateUUID())
  	});

});