var consentRepository
$(document).ready(function() {
	consentRepository = new ConsentRepository()
	var oauth = new OAuth()
  	oauth.login(function(){
  		var urlParamsDecoder = new UrlParamsDecoder(window.location.href)
    	if(urlParamsDecoder.hasParam('id')) {
       		var id = urlParamsDecoder.valueOf('id')
       		consentRepository.find(id, function() {
       			window.location.href = JSON.parse(result[3]).type + '-participate.html?id=' + id
       		})
    	} 
  	})
})