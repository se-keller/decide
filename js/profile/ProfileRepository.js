function ProfileRepository() {
	var EMAIL_COLUMN = 0;
	var JSON_OBJECT_COLUMN = 1;

	this.persist = function(profile) {

  		var gSheet = new GSheets(DECIDE_REPOSITORY_GOOGLE_SPREADSHEET_ID)
  		this.find(profile.email, 
  			function(){
  				// do nothing if entry already exists
  			}, function(){
  				gSheet.append('profiles', [ [profile.email, JSON.stringify(profile)] ])	
  			})

  		
	}

	this.find = function(id, foundCallback, notFoundCallback) {
		var gSheet = new GSheets(DECIDE_REPOSITORY_GOOGLE_SPREADSHEET_ID)

    	gSheet.findRow('profiles', EMAIL_COLUMN, id, 
    		function(result){
    			var profile = JSON.parse(result[JSON_OBJECT_COLUMN])
        		foundCallback(profile)
    		}, function(){
    			console.log("No Profile found for " + id)
    			notFoundCallback()
    		})
	}
}