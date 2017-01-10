function Login(oauth) {

	this.isLoggedIn = function(loggedIn) {
		oauth.isLoggedIn(function(result) {
			loggedIn(result)
		})
	}

	this.login = function(callback) {
		oauth.login(function(){
			callback()	
		})
	}

	this.logout = function(callback) {
		oauth.logout(function(){
			callback()
		})
	}
}