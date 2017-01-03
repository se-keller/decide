function Consent() {
	var AGREE_ID = 'agree'
	var ACCEPT_ID = 'accept'
	var DISAGREE_ID = 'disagree'

	this.type = 'consent'
	this.uuid = ''
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

	this.accept = function(voter, proposal) {
		addVote(ACCEPT_ID, voter, proposal)
	}

	this.disagree = function(voter, newProposal, reason) { 
		addVote(DISAGREE_ID, voter, newProposal, reason)
	}

	this.currentProposal = function() {
		var proposal = ''
		$.each(instance.votes, function(index, vote){
			if(vote.proposal != undefined)
				proposal = vote.proposal
			
		})
		return proposal
	}

	this.creator = function() {
		var currentCreator = ''
		$.each(instance.votes, function(index, vote){
			if(vote.proposal != undefined)
				currentCreator = vote.voter
			
		})
		return currentCreator
	}

	this.hasAgreed = function(voter) {
		if(hasVotedOnLastProposal(voter)) {
			return lastVote(voter).vote === AGREE_ID
		}
		return false
	}

	this.hasAccepted = function(voter) {
		if(hasVotedOnLastProposal(voter)) {
			return lastVote(voter).vote === ACCEPT_ID
		}
		return false 
	}

	var addVote = function(voteToPush, voter, proposal, reason) {
		var vote = new ConsentVote()
		vote.voter = voter
		vote.voteDate = new Date()
		vote.vote = voteToPush
		vote.reason = reason
		vote.proposal = proposal
		instance.votes.push(vote)
	}

	var voteCount = function(voteToCount) {
		var count = 0
		var voters = []
		$.each(instance.votes, function(index, vote){
			voters.push(vote.voter)
		})
		voters = $.unique(voters)
		$.each(voters, function(index, voter){
			if(hasVotedOnLastProposal(voter))
				if(lastVote(voter).vote === voteToCount)
					count++
		})
		return count
	}

	var lastVote = function(voter) {
		var lastVote = undefined
		$.each(instance.votes, function(index, vote){
			if(vote.voter === voter)
				lastVote = vote
			
		})
		return lastVote
	}

	var hasVotedOnLastProposal = function(voter) {
		var hasVoted = false
		$.each(instance.votes, function(index, vote){
			if(vote.voter === voter)
				hasVoted = true
			if(vote.vote === DISAGREE_ID)
				hasVoted = false
		})
		return hasVoted
	}

	
	
	
	
}