function GProfile() {
	var profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();

	this.givenName = function() {
		return profile.getGivenName()
	}

	this.email = function() {
		return profile.getEmail()
	}

	this.imageURL = function() {
		return profile.getImageUrl()
	}

}