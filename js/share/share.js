$(document).ready(function() {
	var urlParamsDecoder = new UrlParamsDecoder(window.location.href)
    if(urlParamsDecoder.hasParams()) {
        var id = urlParamsDecoder.valueOf("id")
        $('#invite-url').text(window.location.origin + "/decide?id="+id)
    }
})