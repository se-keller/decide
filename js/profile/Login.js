function Login(oauth) {

	this.isLoggedIn = function(loggedIn) {
		oauth.isLoggedIn(function(result) {
			loggedIn(result)
		})
	}

	this.login = function(callback, noLoginCallback) {
		oauth.login(function(){
			callback()	
		}, function(){noLoginCallback()})
	}

	this.logout = function(callback) {
		oauth.logout(function(){
			callback()
		})
	}
}