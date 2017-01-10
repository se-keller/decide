function Login(oauth) {

	this.isLoggedIn = function(isLoggedIn) {
		oauth.isLoggedIn(function(loggedIn) {
			isLoggedIn(loggedIn)
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