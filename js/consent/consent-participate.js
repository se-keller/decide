var profile

$(document).ready(function() {
  login.isLoggedIn(function(loggedIn){
    if(loggedIn) {
        profile = new Profile()
        refreshNavigation(profile)
        $('#img-consent-disagree-creator').attr('src', profile.imageUrl)
        $('#img-user-agree').attr('src', profile.imageUrl)
        $('#img-user-accept').attr('src', profile.imageUrl)

        var urlParamsDecoder = new UrlParamsDecoder(window.location.href)
        if(urlParamsDecoder.hasParam('id')) {
          var id = urlParamsDecoder.valueOf('id')
          consentRepository.find(id, function(consent) {
            if(!consent.isParticipant()) {
              consent.addParticipant(profile.email)
              consentRepository.persist(consent, function() {})
            }
            refreshConsent(consent)  
          })
        } 
    } else {
      console.log(window.location.href)
      window.location.href = 'index.html?login='+window.location.href
    }
  })

  $('#btn-consent-participate-agree').click(function(){
    if(isEnabled('#btn-consent-participate-agree')) {
      consent.agree(profile.email)
      consentRepository.persist(consent, function(){
        refreshConsent(consent)
      })
    }
  })

  $('#btn-consent-participate-accept').click(function(){
    if(isEnabled('#btn-consent-participate-accept')) {
      consent.accept(profile.email)
      consentRepository.persist(consent, function(){
        refreshConsent(consent)
      })
    }
  })

  $('#txtarea-consent-disagree-proposal').on('input propertychange paste', function() {
    disableOn($('#txtarea-consent-disagree-proposal').val()==="", 
        ['#btn-consent-disagree-proposal-accept',
        '#btn-consent-disagree-proposal-agree'])
  })
  
  $('#btn-consent-disagree-proposal-accept').click(function(){
      if(isEnabled('#btn-consent-disagree-proposal-accept')) {
          consent.disagree(profile.email, $('#txtarea-consent-disagree-proposal').val(), $('#txtarea-consent-disagree-reason').val())
          consent.accept(profile.email)
          consentRepository.persist(consent, function(){
            $("#modal-consent-disagree").modal('hide')
            refreshConsent(consent)
          })  
      }
  })

  $('#btn-consent-disagree-proposal-agree').click(function(){
    if(isEnabled('#btn-consent-disagree-proposal-agree')) {
      consent.disagree(profile.email, $('#txtarea-consent-disagree-proposal').val(), $('#txtarea-consent-disagree-reason').val())
        consent.agree(profile.email)
        consentRepository.persist(consent, function(){
          $("#modal-consent-disagree").modal('hide')
          refreshConsent(consent)
        })  
    }
  })

  $('#btn-consent-participate-disagree').click(function(){    
    $("#modal-consent-disagree").modal('show');
  })

})

function refreshConsent(consent) {
    $('#p-consent-participate-current-decision').html(consent.currentProposal().replace(/(?:\r\n|\r|\n)/g, '<br />'))
    refreshBadges(consent)
    refreshButtons(consent)
    profileRepository.find(consent.creator(), function(creatorProfile){
      $('#img-consent-participate-creator').attr('src', creatorProfile.imageUrl)
      $('#h-consent-participate').empty()
      $('#h-consent-participate').append(creatorProfile.givenName+ ' <small><i>'+new Date(consent.currentProposalDate()).toLocaleString()+'</i></small>')
    }, function(){
      console.log('Profile of creator not found')
    })
    $('#consent-log-body').empty()
    
    $.each(consent.votes, function(index, vote){
      profileRepository.find(vote.voter, function(profile){
        $('#consent-log-body').append(createVoteHtml(vote, profile))
      }, function() {
        console.log('Profile of voter not found')
      })
      
    })
  }

function refreshBadges(consent) {
  $('#bdg-consent-participate-agree').text(consent.agreeCount())
  $('#bdg-consent-participate-accept').text(consent.acceptCount())
}

function refreshButtons(consent) {
  disableOn(consent.hasAgreed(profile.email), ['#btn-consent-participate-agree'])
  disableOn(consent.hasAccepted(profile.email), ['#btn-consent-participate-accept']) 
  if(consent.hasAgreed(profile.email)) {
    $('#img-user-agree').removeClass('hidden')
    $('#img-user-accept').addClass('hidden')
  }
  if(consent.hasAccepted(profile.email)) {
   $('#img-user-agree').addClass('hidden')
    $('#img-user-accept').removeClass('hidden')
  }
}