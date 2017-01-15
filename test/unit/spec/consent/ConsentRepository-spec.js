describe("ConsentRepository", function() {
  
  var repository

  beforeEach(function() {
    repository = new ConsentRepository(new GSheets())
  });

  it("can find persisted consent", function() {
    var consent = createConsent()

    var foundConsent
    repository.persist(consent, function() {
      repository.find(consent.uuid, function(result){foundConsent = result}, function(){fail('could not find consent')})
    })

    expect(equals(foundConsent,consent)).toEqual(true)	
  });

  it("can find all consents where a voter is participant", function() {
    var consent1 = createConsent('voter')
    var consent2 = createConsent('voter')

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

  it("can remove any participant", function() {
    var consent = createConsent('voter')

    repository.persist(consent, function() {
      repository.ignoreConsent(consent.uuid, 'voter', function(){
        repository.findConsents('voter', function(consents){
          foundConsents = consents
        })
      })
    })

    expect(equals(foundConsents, [consent])).toEqual(false)
  })

  var equals = function(a, b) {
    return JSON.stringify(a) == JSON.stringify(b)
  }

  var createConsent = function(voter) {
    var consent = new Consent()
    consent.uuid = new UUID().generate()
    if(voter !== undefined)
      consent.addParticipant(voter)
    return consent
  }

})