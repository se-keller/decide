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
		if(consent.type === 'consent') {
			var consentIdString = "'" +  consent.uuid + "'"
			html += '<tr>'
			+    '<td>' + consent.type + '</td>'
			+    '<td>' + consent.currentProposal() + '</td>'
			+    '<td style="text-align: center"><a href="consent-participate.html?id=' + consent.uuid + '"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a></td>'
			+    '<td style="text-align: center"><a href="#" onclick="ignoreConsent('+consentIdString+')"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>'
			+ '</td>'
		}
			
		
	})
	return html
}