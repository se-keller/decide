$(document).ready(function() {
  $('#txtarea-consent-proposal').on('input propertychange paste', function() {
      if($('#txtarea-consent-proposal').val()==="") {
        $('#btn-consent-proposal-accept').addClass("disabled")
        $('#btn-consent-proposal-agree').addClass("disabled")  
      } else {
        $('#btn-consent-proposal-accept').removeClass("disabled")
        $('#btn-consent-proposal-agree').removeClass("disabled")  
      }
  });
});