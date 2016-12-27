function Consent(uuid, creatorEmail, proposal) {
	this['agreeCount'] = 0
	this.acceptCount = 0
	this.currentDecision = proposal
	this.creator = creatorEmail
	this.id = uuid
	var instance = this
	
	this.agree = function() {
		instance.agreeCount++
	}
	
	this.accept = function() {
		instance.acceptCount++
	}
	
	this.disagree = function(reason, newProposal) {
		instance.agreeCount = 0
		instance.acceptCount = 0
		instance.currentDecision = newProposal
	}

	
}