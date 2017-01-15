var createConsentsTableBody = function(consents) {
	var html = ''
	if(consents.length == 0) {
		html += '<tr>'
			+    '<td></td>'
			+    '<td>You do not participate in any consent decisions</td>'
			+    '<td></td>'
			+ '</td>'
	}
	$.each(consents, function(index, consent){
		if(consent.type === 'consent')
			html += '<tr>'
			+    '<td>' + consent.type + '</td>'
			+    '<td>' + consent.currentProposal() + '</td>'
			+    '<td><a href="consent-participate.html?id=' + consent.uuid + '">participate</a></td>'
			+    '<td><a onclick="ignoreConsent('+consent.uuid+')">ignore</a></td>'
			+ '</td>'
		
	})
	return html
}