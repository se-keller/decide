var consentRepository
var profileRepository
var profile

$(document).ready(function() {
	var login = new Login()
	login.login(function(){

    profile = new Profile()
    consentRepository = new ConsentRepository()
    profileRepository = new ProfileRepository()

    $('#img-consent-disagree-creator').attr('src', profile.imageUrl)

		var urlParamsDecoder = new UrlParamsDecoder(window.location.href)
  	if(urlParamsDecoder.hasParam('id')) {
   		var id = urlParamsDecoder.valueOf('id')
      consentRepository.find(id, function(consent) {
        refreshConsent(consent)  
      })
  	} 
	})

  var refreshConsent = function(consent) {
    $('#p-consent-participate-current-decision').html(consent.currentProposal().replace(/(?:\r\n|\r|\n)/g, '<br />'))
    $('#h-consent-participate').empty()
    $('#h-consent-participate').append('Proposal <small><i>'+new Date(consent.currentProposalDate()).toLocaleString()+'</i></small>')
    refreshBadges(consent)
    refreshButtons(consent)
    profileRepository.find(consent.creator(), function(creatorProfile){
      $('#img-consent-participate-creator').attr('src', creatorProfile.imageUrl)
    }, function(){
      console.log('Profile of creator not found')
    })
    $('#consent-history-body').empty()
    
    $.each(consent.votes, function(index, vote){
      createVoteHtml(vote, function(voteHtml){
        $('#consent-history-body').append(voteHtml)
      })
    })
  }

  var createVoteHtml = function(vote, callback) {
    
    profileRepository.find(vote.voter, function(profile){
    var voteHtml = ''
    if(vote.vote === 'disagree') {
      voteHtml = '<div class="panel panel-danger">'
      + '<div class="panel-heading">'
      +   '<h3 class="panel-title">New proposal</h3>'
      + '</div>'
    } 

    voteHtml += 
        '<div class="panel-body">'
      +  '<div class="media">'
      +   '<div class="media-left">'
      +     '<img class="media-object img-circle" src="'+profile.imageUrl+'" >'
      +   '</div>'
      +   '<div class="media-body">'
      +     '<h4 class="media-heading">'+profile.givenName+' <small><i>'+new Date(vote.voteDate).toLocaleString()+'</i></small></h4>'
      +     '<p>'+vote.vote+'</p>'
      
      if(vote.proposal!=undefined)
        voteHtml += vote.proposal

      voteHtml +=
          '</div>'
      +  '</div>'
      + '</div>'

      if(vote.vote === 'disagree')
        voteHtml += '</div>'
    callback(voteHtml)
    }, function(){console.log('Profile of creator not found')})
    
  }

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

function refreshBadges(consent) {
  $('#bdg-consent-participate-agree').text(consent.agreeCount())
  $('#bdg-consent-participate-accept').text(consent.acceptCount())
}

function refreshButtons(consent) {
  disableOn(consent.hasAgreed(profile.email), ['#btn-consent-participate-agree'])
  disableOn(consent.hasAccepted(profile.email), ['#btn-consent-participate-accept'])  
}