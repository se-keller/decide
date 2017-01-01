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

})