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
    consent.agree('voterEmail')
    consent.accept('voterEmail')
    consent.disagree('voterEmail', 'newProposal')
    expect(consent.acceptCount()).toEqual(0)
    expect(consent.agreeCount()).toEqual(0)
  });

  it("can retrieve current proposal after different votes on same proposal", function() {
    consent.agree('voterEMail', 'proposal')
    consent.accept('different voterEMail')
    expect(consent.currentProposal()).toEqual('proposal')
  });

  it("can retrieve current proposal after disagree", function() {
    consent.agree('voterEMail', 'proposal')
    consent.disagree('different voterEMail', 'disagree proposal')
    expect(consent.currentProposal()).toEqual('disagree proposal')
  });

})