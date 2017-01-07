var createVoteHtml = function(vote, profile) {
        
    var voteHtml = ''
    if(vote.vote === 'disagree') {
      voteHtml = '<div class="panel panel-danger">'
      + '<div class="panel-heading">'
      +   '<h3 class="panel-title">New proposal</h3>'
      + '</div>'
    } 

    if(vote.vote !== 'disagree' && vote.proposal != undefined) {
      voteHtml = '<div class="panel panel-default">'
      + '<div class="panel-heading">'
      +   '<h3 class="panel-title">Initial proposal</h3>'
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
      
      if(vote.vote === 'agree')
        voteHtml += '<div><span class="glyphicon glyphicon glyphicon-thumbs-up" aria-hidden="true"></span></div>'
      if(vote.vote === 'accept')
        voteHtml += '<div><span class="glyphicon glyphicon glyphicon-thumbs-up gly-rotate-270" aria-hidden="true"></span></div>'
      if(vote.vote === 'disagree')
        voteHtml += '<div><span class="glyphicon glyphicon glyphicon-thumbs-down" aria-hidden="true"></span></div>'
      
      

      if(vote.reason!=undefined && vote.reason !== '') {
        voteHtml += '<b>Reason</b><br/>'+vote.reason+'<br/><br/>'
      }

      if(vote.vote === 'disagree') {
        voteHtml += '<b>Proposal</b><br/>'
      }

      if(vote.proposal!= undefined)
        voteHtml += vote.proposal

      voteHtml +=
          '</div>'
      +  '</div>'
      + '</div>'

      if(vote.proposal != undefined)
        voteHtml += '</div>'
    return voteHtml
    
  }