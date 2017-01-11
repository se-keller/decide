var createConsentsTableBody = function(consents) {
	console.log('creating html')
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
	return html
}