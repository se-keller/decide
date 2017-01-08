console.log('TEST logout 3')
var DECIDE_GOOGLE_API_KEY = 'AIzaSyDbR2kJv9QUCbSRPOPt3R7v31NCquDEz7w'
var DECIDE_GOOGLE_API_CLIENT_ID = '847560978980-gj7ac8oo7h5spk4uupdko3j865aon6hu.apps.googleusercontent.com'
var DECIDE_GOOGLE_API_SCOPES = 'https://www.googleapis.com/auth/spreadsheets profile'
var DECIDE_GOOGLE_API_DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4', 'https://people.googleapis.com/$discovery/rest?version=v1']

var DECIDE_REPOSITORY_GOOGLE_SPREADSHEET_ID = '1bsPVDw_DKoByu3_y8bn3pQ_VAF8Mr8QJA5pcZIZATpI'

$(document).ready(function() {
	$('#nav-login-logout').click(function(){
    	new Login().logout(function(){})
  	})
})