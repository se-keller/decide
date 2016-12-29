function Consent() {
	this.type = 'consent'
	this.agreeCount = 0
	this.acceptCount = 0
	this.currentDecision = ''
	this.creatorEMail = ''
	this.uuid = ''
	this.creationDate = new Date()
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