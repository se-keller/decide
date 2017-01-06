var consentRepository
var profileRepository
var profile
var currentConsent

$(document).ready(function() {
	var login = new Login()
	login.login(function(){

    profile = new Profile()
    consentRepository = new ConsentRepository()
    profileRepository = new ProfileRepository()

		var urlParamsDecoder = new UrlParamsDecoder(window.location.href)
  	if(urlParamsDecoder.hasParam('id')) {
   		var id = urlParamsDecoder.valueOf('id')
      consentRepository.find(id, function(consent) {
        currentConsent = consent
        $('#p-consent-participate-current-decision').html(consent.currentProposal().replace(/(?:\r\n|\r|\n)/g, '<br />'))
        refreshBadges(consent)
        refreshButtons(consent)
        profileRepository.find(consent.creator(), function(profile){
          $('#img-consent-participate-creator').attr('src', profile.imageUrl)
        }, function(){
          console.log('Profile of creator not found')
        })
        $.each(consent.votes, function(index, vote){
          createVoteHtml(vote, function(voteHtml){
            $('#consent-history').append(voteHtml)  
          })
          
        })
          
      })
  	} 
	})

  var createVoteHtml = function(vote, callback) {
    
    profileRepository.find(vote.voter, function(profile){
    var voteHtml = ''  
    voteHtml = '<div class="media">'
      + '<div class="media-left">'
      +   '<img class="media-object img-circle" src="'+profile.imageUrl+'" >'
      + '</div>'
      + '<div class="media-body">'
      +   '<h4 class="media-heading">'+profile.givenName+'</h4>'
      +   vote.vote
      + '</div>'
    +'</div>'
    callback(voteHtml)
    }, function(){console.log('Profile of creator not found')})
    
  }

  $('#btn-consent-participate-agree').click(function(){
    if(isEnabled('#btn-consent-participate-agree')) {
      consent.agree(profile.email)
      consentRepository.persist(consent, function(){
        refreshBadges(consent)
        refreshButtons(consent)
      })
    }
  })

  $('#btn-consent-participate-accept').click(function(){
    if(isEnabled('#btn-consent-participate-accept')) {
      consent.accept(profile.email)
      consentRepository.persist(consent, function(){
        refreshBadges(consent)
        refreshButtons(consent)
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
              window.location.href = 'consent-participate.html?id=' + consent.uuid
          })  
      }
  })

  $('#btn-consent-disagree-proposal-agree').click(function(){
      if(isEnabled('#btn-consent-disagree-proposal-agree')) {
        consent.disagree(profile.email, $('#txtarea-consent-disagree-proposal').val(), $('#txtarea-consent-disagree-reason').val())
          consent.agree(profile.email)
          consentRepository.persist(consent, function(){
            //window.location.href = 'consent-participate.html?id=' + consent.uuid
            $("#modal-consent-disagree").modal('hide');
          })  
      }
    })

    $('#btn-consent-disagree-proposal-cancel').click(function(){
      //window.location.href = 'consent-participate.html?id=' + consent.uuid
      $("#modal-consent-disagree").modal('hide');
  })

  $('#btn-consent-participate-disagree').click(function(){
    //window.location.href = 'consent-disagree.html?id=' + consent.uuid
    $('#img-consent-disagree-creator').attr('src', profile.imageUrl)
    $("#modal-consent-disagree").modal('show');
  })
  

})

function refreshBadges(consent) {
  $('#bdg-consent-participate-agree').text(consent.agreeCount())
  $('#bdg-consent-participate-accept').text(consent.acceptCount())
}

function refreshButtons(consent) {
  disableOn(consent.hasAgreed(profile.email), ['#btn-consent-participate-agree'])
  disableOn(consent.hasAccepted(profile.email), ['#btn-consent-participate-accept'])  
}