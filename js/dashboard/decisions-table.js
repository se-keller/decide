var createConsentsTableBody = function(consents) {
	var html = ''
	$.each(consents, function(index, consent){
		if(consent.type === 'consent')
			html += '<tr>'
			+    '<td>' + consent.type + '</td>'
			+    '<td>' + consent.currentProposal() + '</td>'
			+    '<td><a href="consent-participate.html?id=' + consent.uuid + '"">participate</a></td>'
			+ '</td>'
		
	})
	return html
}