function Login(oauth) {

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