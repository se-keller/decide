var createConsentsTableBody = function(consents, voter) {
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

			var needsInput = '<td style="text-align: center"><a href="consent-participate.html?id=' + consent.uuid + '"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span></a></td>'
			if(!consent.hasVotedOnLastProposal(voter))
				needsInput = '<td/>'
			html += '<tr>'
			+    needsInput
			+    '<td><a href="consent-participate.html?id=' + consent.uuid + '">' + consent.currentProposal() + '</a></td>'
			+    '<td style="text-align: center"><a href="share.html?id=' + consent.uuid + '"><span class="glyphicon glyphicon-share" aria-hidden="true"></span></a></td>'
			+    '<td style="text-align: center"><a href="#" onclick="ignoreConsent('+consentIdString+')"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>'
			+ '</td>'
		}
			
		
	})
	return html
}