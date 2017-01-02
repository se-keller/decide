describe("Consent", function() {
  
  var consent

  beforeEach(function() {
    consent = new Consent()
  });

  it("agree increments agree count", function() {
    consent.agree('voterEMail')
    expect(consent.agreeCount()).toEqual(1)
  });

  it("accept increments accept count", function() {
    consent.accept('voterEMail')
    expect(consent.acceptCount()).toEqual(1)
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

})