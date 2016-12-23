function Consent(creator, proposal) {
	var agreeCount = 0
	var acceptCount = 0
	var currentDecision = proposal
	this.agree = function() {
		agreeCount++
	}
	this.accept = function() {
		acceptCount++
	}
	this.disagree = function(reason, newProposal) {
		agreeCount = 0
		acceptCount = 0
		currentDecision = newProposal
	}
	this.currentDecision() {
		return currentDecision
	}
}