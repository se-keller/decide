function Profile() {
	var profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();

	this.givenName = profile.getGivenName()
	this.familyName = profile.getFamilyName()
	this.email = profile.getEmail()
	this.imageUrl = profile.getImageUrl()

}