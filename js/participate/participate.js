$(document).ready(function() {
	var oauth = new OAuth()
  	oauth.login()

	console.log('constants refactoring')
	

    $('#h-participate').click(function(){
	    var urlParamsDecoder = new UrlParamsDecoder(window.location.href)
    	if(urlParamsDecoder.hasParams()) {
       		var id = urlParamsDecoder.valueOf("id")
        	var gSheet = new GSheets(DECIDE_REPOSITORY_GOOGLE_SPREADSHEET_ID)
        	gSheet.findRow(0, id, function(result){
        		console.log(JSON.parse(result[3]).type)
        		window.location.href = result[3].type + '-participate.html?id=' + id
        	})
    	} 
	});
})