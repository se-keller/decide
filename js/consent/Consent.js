function Consent() {
	var AGREE_ID = 'agree'
	var ACCEPT_ID = 'accept'
	var DISAGREE_ID = 'disagree'

	this.type = 'consent'
	this.creatorEMail = ''
	this.uuid = ''
	this.creationDate = new Date()
	this.votes = []
	var instance = this
	
	this.agree = function(voterEMail, proposal) {
		addVote(AGREE_ID, voterEMail, proposal)
	}

	this.agreeCount = function() {
		return voteCount(AGREE_ID)
	}

	this.acceptCount = function() {
		return voteCount(ACCEPT_ID)	
	}

	this.accept = function(voterEMail, proposal) {
		addVote(ACCEPT_ID, voterEMail, proposal)
	}

	this.disagree = function(voterEMail, newProposal, reason) { 
		addVote(DISAGREE_ID, voterEMail, newProposal, reason)
	}

	this.currentProposal = function() {
		var proposal = ''
		$.each(instance.votes, function(index, vote){
			if(vote.proposal != undefined)
				proposal = vote.proposal
			
		})
		return proposal
	}

	var addVote = function(voteToPush, voterEMail, proposal, reason) {
		var vote = new ConsentVote()
		vote.voterEMail = voterEMail
		vote.voteDate = new Date()
		vote.vote = voteToPush
		vote.reason = reason
		vote.proposal = proposal
		instance.votes.push(vote)
	}

	var voteCount = function(voteToCount) {
		var count = 0
		$.each(instance.votes, function(index, vote){
			if(vote.vote === voteToCount)
				count++
			if(vote.vote === DISAGREE_ID)
				count = 0
		})
		return count
	}



	

	
	
	
	
}