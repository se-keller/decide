describe("ConsentRepository", function() {
  
  var repository

  beforeEach(function() {
    repository = new ConsentRepository()
  });

  it("can find persisted consent", function() {
    var consent = new Consent()
    consent.uuid = 1

    var foundConsent
    repository.persist(consent, function() {
      repository.find(1, function(result){foundConsent = result}, function(){fail('could not find consent')})
    })

    expect(equals(foundConsent,consent)).toEqual(true)	
  });

  it("can find all consents where a voter is participant", function() {
    var consent1 = new Consent()
    consent1.uuid = 1
    consent1.addParticipant('voter')
    var consent2 = new Consent()
    consent2.uuid = 2
    consent2.addParticipant('voter')

    var foundConsents = []
    repository.persist(consent1, function() {
      repository.persist(consent2, function(){
        repository.findConsents('voter', function(consents){
          foundConsents = consents
        })
      })
    })
    
    expect(equals(foundConsents, [consent1, consent2])).toEqual(true)
  });

  var equals = function(a, b) {
    return JSON.stringify(a) == JSON.stringify(b)
  }

})