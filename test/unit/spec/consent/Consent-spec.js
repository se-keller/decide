describe("Consent", function() {
  
  var consent

  beforeEach(function() {
    consent = new Consent()
  });

  it("agree increments agree count", function() {
    consent.agree('voter')
    expect(consent.agreeCount()).toEqual(1)
  });

  it("accept increments accept count", function() {
    consent.accept('voter')
    expect(consent.acceptCount()).toEqual(1)
  });

  it("switch from agree to accept does not count the agree", function(){
    consent.agree('voter')
    consent.accept('voter')
    expect(consent.agreeCount()).toEqual(0)
    expect(consent.acceptCount()).toEqual(1)
  });

  it("one accept from one voter and one agree from a different voter increments the individual vote counts", function(){
    consent.agree('voter 1')
    consent.accept('voter 2')
    expect(consent.agreeCount()).toEqual(1)
    expect(consent.acceptCount()).toEqual(1)
  });

  it("one agree before a disagree is not counted", function(){
    consent.agree('voter 1')
    consent.disagree('voter 2', 'newProposal')
    expect(consent.agreeCount()).toEqual(0)
  });

  it("disagree resets agree- and accept-count", function() {
    consent.agree('voter')
    consent.accept('voter')
    consent.disagree('voter', 'newProposal')
    expect(consent.acceptCount()).toEqual(0)
    expect(consent.agreeCount()).toEqual(0)
  });

  it("can retrieve current proposal after different votes on same proposal", function() {
    consent.agree('voter', 'proposal')
    consent.accept('different voter')
    expect(consent.currentProposal()).toEqual('proposal')
  });

  it("can retrieve current proposal after disagree", function() {
    consent.agree('voter', 'proposal')
    consent.disagree('different EMail', 'disagree proposal')
    expect(consent.currentProposal()).toEqual('disagree proposal')
  });

  it("last voter with proposal is creator", function() {
    consent.agree('voter', 'proposal')
    consent.disagree('different voter', 'new proposal')
    expect(consent.creator()).toEqual('different voter')
  });

  it("can find out if a voter already agreed on last vote", function() {
    expect(consent.hasAgreed('agree voter')).toEqual(false)
    consent.agree('agree voter', 'proposal')
    expect(consent.hasAgreed('agree voter')).toEqual(true)
  });

  it("can find out if a voter already accepted on last vote", function() {
    expect(consent.hasAccepted('accept voter')).toEqual(false)
    consent.accept('accept voter', 'proposal')
    expect(consent.hasAccepted('accept voter')).toEqual(true)
  });

  it("accepted proposel is not accepted after disagree", function() {
    consent.accept('voter 1', 'proposal 1')
    consent.disagree('voter 2', 'proposal 2')
    expect(consent.hasAccepted('voter 1')).toEqual(false)
    expect(consent.hasAccepted('voter 2')).toEqual(false)
  });

  it("doesn't know voters who are no participants", function() {
    expect(consent.isParticipant('voter')).toEqual(false)
  });

  it("adds the voter of a vote to the list of participants", function() {
    consent.agree('voter')
    expect(consent.isParticipant('voter')).toEqual(true)
  });

  it("can add a participant", function() {
    consent.addParticipant('participant')
    expect(consent.isParticipant('participant')).toEqual(true)
  });

  it("can remove a participant", function() {
    consent.addParticipant('participant')
    consent.removeParticipant('participant')
    expect(consent.isParticipant('participant')).toEqual(false)
  });

  it("can not find unknown participant", function() {
    expect(consent.isParticipant('unknown participant')).toEqual(false)
  });

  

})