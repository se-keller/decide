function Consent() {
	var AGREE_ID = 'agree'
	var ACCEPT_ID = 'accept'
	var DISAGREE_ID = 'disagree'

	this.type = 'consent'
	this.uuid = ''
	this.votes = []
	this.participants = []
	var instance = this
	
	this.agree = function(voter, proposal) {
		instance.addParticipant(voter)
		addVote(AGREE_ID, voter, proposal)
	}

	this.accept = function(voter, proposal) {
		instance.addParticipant(voter)
		addVote(ACCEPT_ID, voter, proposal)
	}

	this.disagree = function(voter, newProposal, reason) { 
		instance.addParticipant(voter)
		addVote(DISAGREE_ID, voter, newProposal, reason)
	}

	this.agreeCount = function() {
		return voteCount(AGREE_ID)
	}

	this.acceptCount = function() {
		return voteCount(ACCEPT_ID)	
	}

	this.currentProposal = function() {
		var proposal = ''
		$.each(instance.votes, function(index, vote){
			if(vote.proposal != undefined)
				proposal = vote.proposal
			
		})
		return proposal
	}

	this.currentProposalDate = function() {
		var date
		$.each(instance.votes, function(index, vote){
			if(vote.proposal != undefined)
				date = vote.voteDate
			
		})
		return date
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
		if(instance.hasVotedOnLastProposal(voter)) {
			return lastVote(voter).vote === AGREE_ID
		}
		return false
	}

	this.hasAccepted = function(voter) {
		if(instance.hasVotedOnLastProposal(voter)) {
			return lastVote(voter).vote === ACCEPT_ID
		}
		return false 
	}

	this.isParticipant = function(voter) {
		return $.inArray(voter, instance.participants) != -1
	}

	this.addParticipant = function(participant) {
		instance.participants.push(participant)
		instance.participants = $.unique(instance.participants)
	}

	this.removeParticipant = function(participant) {
		instance.participants.splice( $.inArray(participant, instance.participants), 1 )
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
			if(instance.hasVotedOnLastProposal(voter))
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

	this.hasVotedOnLastProposal = function(voter) {
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