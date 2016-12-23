function Consent(creatorEmail, proposal) {
	var agreeCount = 0
	var acceptCount = 0
	var currentDecision = proposal
	var creator = creatorEmail
	
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

	this.getCurrentDecision = function() {
		return currentDecision
	}

	this.getCreator = function() {
		return creator
	}
}