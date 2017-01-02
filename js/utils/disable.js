var isDisabled = function(selector) {
	return $(selector).hasClass("disabled")
}

var isEnabled = function(selector) {
	return !$(selector).hasClass("disabled")
}

var disableOn = function(disablePredicate, selectors) {
	$.each(selectors, function(index, selector) {
		console.log(selector)
		console.log(disablePredicate)
		if(disablePredicate)
			$(selector).addClass("disabled")
		else
			$(selector).removeClass("disabled")	
	})
}

