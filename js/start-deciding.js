$(document).ready(function() {

  	$('#btn-start-deciding').click(function(){
  		console.log('Login...')
    	login.isLoggedIn(function(loggedIn) {
    		console.log('login status = ' + loggedIn)
    		if(loggedIn) {
    			window.location.href = 'consent-create.html'
    		} else {
    			login.login(function() {
    				window.location.href = 'consent-create.html'
    			})
    		}
    	}
	})

})