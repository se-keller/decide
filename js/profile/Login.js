var oauth
var profileRepository
function Login() {
	oauth = new OAuth()
	profileRepository = new ProfileRepository()

	this.login = function(callback) {
		oauth.login(function(){
			callback()	
		});
	}
}