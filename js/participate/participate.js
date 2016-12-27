$(document).ready(function() {
	console.log('Durchstich with id now 7')
	

    $('#h-participate').click(function(){
	    var urlParamsDecoder = new UrlParamsDecoder(window.location.href)
    	if(urlParamsDecoder.hasParams()) {
       		var id = urlParamsDecoder.valueOf("id")
        	var gSheet = new GSheets('1bsPVDw_DKoByu3_y8bn3pQ_VAF8Mr8QJA5pcZIZATpI')
        	gSheet.findRow(0, id, function(result){
        		console.log(result)
        	})
    	} 
	});
})