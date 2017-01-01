function Consent() {
	this.type = 'consent'
	this.currentDecision = ''
	this.creatorEMail = ''
	this.uuid = ''
	this.creationDate = new Date()
	this.votes = []
	var instance = this
	
	this.agree = function(voterEMail) {
		addVote('agree', voterEMail)
	}

	this.agreeCount = function() {
		return voteCount('agree')
	}

	this.acceptCount = function() {
		return voteCount('accept')	
	}

	this.accept = function(voterEMail) {
		addVote('accept', voterEMail)
	}

	this.disagree = function(reason, newProposal) {
		instance.agreeCount = 0
		instance.acceptCount = 0
		instance.currentDecision = newProposal
	}

	var addVote = function(voteToPush, voterEMail) {
		var vote = new ConsentVote()
		vote.voterEMail = voterEMail
		vote.voteDate = new Date()
		vote.vote = voteToPush
		instance.votes.push(vote)
	}

	var voteCount = function(voteToCount) {
		var count = 0
		$.each(instance.votes, function(index, vote){
			if(vote.vote === voteToCount)
				count++
		})
		return count
	}



	

	
	
	
	
}