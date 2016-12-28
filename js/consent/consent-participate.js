$(document).ready(function() {
	var oauth = new OAuth()
  	oauth.login(function(){
  		var urlParamsDecoder = new UrlParamsDecoder(window.location.href)
    	if(urlParamsDecoder.hasParam('id')) {
       		var id = urlParamsDecoder.valueOf('id')
        	var gSheet = new GSheets(DECIDE_REPOSITORY_GOOGLE_SPREADSHEET_ID)
        	gSheet.findRow(0, id, function(result){
        		var consent = JSON.parse(result[3])
            $('#p-current-decision').text(consent.currentDecision)
        	})
    	} 
  	})
})