var refreshNavigation = function(profile) { 
	$('#nav-user-image').attr('src', profile.imageUrl)
    $('#nav-profile-user-image').attr('src', profile.imageUrl)
    $('#nav-profile-user-name').text(profile.givenName + ' ' + profile.familyName)
    $('#nav-profile-user-email').text(profile.email)
    $('#nav-drpdwn-menu').removeClass('hidden')
    $('#btn-consent-proposal-accept').click(function(){
    	login.logout(function(){
    		window.location.href = 'index.html?logout=true'
    	})
    })
}