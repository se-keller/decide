$(document).ready(function() {
	var oauth = new OAuth()
  	oauth.login(function(){
  		var urlParamsDecoder = new UrlParamsDecoder(window.location.href)
    	if(urlParamsDecoder.hasParam('id')) {
       		var id = urlParamsDecoder.valueOf('id')
        	var gSheet = new GSheets(DECIDE_REPOSITORY_GOOGLE_SPREADSHEET_ID)
        	gSheet.findRow(0, id, function(result){
        		window.location.href = JSON.parse(result[3]).type + '-participate.html?id=' + id
        	})
    	} 
  	})
})