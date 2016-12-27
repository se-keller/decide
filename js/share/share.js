$(document).ready(function() {
	var urlParamsDecoder = new UrlParamsDecoder(window.location.href)
    if(urlParamsDecoder.hasParams()) {
        var id = urlParamsDecoder.valueOf("id")
        $('#invite-url').val(window.location.origin + "/decide/participate.html?id="+id)
        $('#invite-url').focus()
        $('#invite-url').select()
    }

    $('#btn-copy-to-clipboard').click(function(){
    	$('#invite-url').focus()
        $('#invite-url').select()
        var successful = document.execCommand('copy')
        $('#invite-url').focus()
        $('#invite-url').select()
    })
})