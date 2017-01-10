function ProfileRepository(gSheet) {
  var cache = {}
	var EMAIL_COLUMN = 0;
	var JSON_OBJECT_COLUMN = 1;

	this.persist = function(profile, persistedCallback) {
  		this.find(profile.email, 
  			function(){
  				// do nothing if entry already exists
  				persistedCallback()
  			}, function(){
  				gSheet.append('profiles', [ [profile.email, JSON.stringify(profile)] ], function(){
            cache[profile.email] = profile
  					persistedCallback()
  				})	
  			})  
        		
	}

	this.find = function(id, foundCallback, notFoundCallback) {
    if(id in cache) {
      foundCallback(cache[id])
    } else {
      gSheet.findRow('profiles', EMAIL_COLUMN, id, 
        function(result){
          var profile = JSON.parse(result[JSON_OBJECT_COLUMN])
            cache[id] = profile  
            foundCallback(profile)
        }, function(){
          notFoundCallback()
        })  
    }
		
	}
}