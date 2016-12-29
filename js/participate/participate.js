var consentRepository
$(document).ready(function() {
	consentRepository = new ConsentRepository()
	var login = new Login()
  	login.login(function(){
  		var urlParamsDecoder = new UrlParamsDecoder(window.location.href)
    	if(urlParamsDecoder.hasParam('id')) {
       		var id = urlParamsDecoder.valueOf('id')
       		consentRepository.find(id, function(consent) {
       			window.location.href = consent.type + '-participate.html?id=' + id
       		})
    	} 
  	})
})