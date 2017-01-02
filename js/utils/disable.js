var isDisabled = function(selector) {
	return $(selector).hasClass("disabled")
}

var isEnabled = function(selector) {
	return !$(selector).hasClass("disabled")
}

var disableOn = function(disablePredicate, selectors) {
	if(disablePredicate) {
		$.each(selectors, function(index, selector) {
			if(disablePredicate)
				$(selector).addClass("disabled")
			else
				$(selector).removeClass("disabled")	
		})
	}
}

