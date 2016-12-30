var oauth
var profileRepository
function Login() {
	oauth = new OAuth()
	profileRepository = new ProfileRepository()

	this.login = function(callback) {
		oauth.login(function(){
			var profile = new Profile()
			profileRepository.find(profile, 
				function(){
					callback()
				}, function(){
					profileRepository.persist(profile)
					callback()	
				})
			
		});
	}
}