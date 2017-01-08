var oauth
var profileRepository
function Login() {
	oauth = new OAuth()
	profileRepository = new ProfileRepository()

	this.login = function(callback) {
		oauth.login(function(){
			callback()	
		})
	}

	this.logout = function(callback) {
		oauth.logout(function()) {
			callback()
		})
	}
}