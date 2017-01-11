$(document).ready(function() {
	var redirect = 'consent-create.html'
	var urlParamsDecoder = new UrlParamsDecoder(window.location.href)
  	if(urlParamsDecoder.hasParam('login')) {
   		redirect = urlParamsDecoder.valueOf('login')
  	} 

  	$('#btn-start-deciding').click(function(){
  		console.log('Login...')
    	login.isLoggedIn(function(loggedIn) {
    		console.log('login status = ' + loggedIn)
    		if(loggedIn) {
    			window.location.href = redirect
    		} else {
    			// could login
    			login.login(function() {
    				window.location.href = redirect
    			// could not login
    			}, function(){
    				$("#alrt-no-login").removeClass("hidden")
    				$("#alrt-no-login").show()
    			})
    		}
    	})
	})

})