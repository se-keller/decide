var createConsentsTableBody = function(consents) {
	console.log(consents.length)
	var html = ''
	$.each(consents, function(index, consent){
		console.log('what a nice consent')
		if(consent.type === 'consent')
			html += '<tr>'
			+    '<td>' + consent.type + '</td>'
			+    '<td>' + consent.currentProposal() + '</td>'
			+    '<td><a href="consent-participate.html?id=' + consent.uuid + '"">participate</a></td>'
			+ '</td>'
		
	})
	for(var i=0; i < consents.length; i++) {
		console.log('a consent: ' + consents[i])
	}
	return html
}