$(document).ready(function() {
	var oauth = new OAuth(
    'AIzaSyDbR2kJv9QUCbSRPOPt3R7v31NCquDEz7w',
    '847560978980-gj7ac8oo7h5spk4uupdko3j865aon6hu.apps.googleusercontent.com'
    )
  	oauth.login()

	console.log('Durchstich 3')
	var urlParamsDecoder = new UrlParamsDecoder(window.location.href)
    if(urlParamsDecoder.hasParams()) {
        var id = urlParamsDecoder.valueOf("id")
        var gSheet = new GSheets('1bsPVDw_DKoByu3_y8bn3pQ_VAF8Mr8QJA5pcZIZATpI')
        console.log(gSheet.appen(gSheet.append([ ['wunderlich'] ])))
    } 
})