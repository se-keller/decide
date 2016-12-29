function ProfileRepository() {
	var EMAIL_COLUMN = 0;
	var JSON_OBJECT_COLUMN = 1;

	this.persist = function(profile) {
  		var gSheet = new GSheets(DECIDE_REPOSITORY_GOOGLE_SPREADSHEET_ID)
  		gSheet.append('profiles', [ [profile.email, JSON.stringify(profile)] ])
	}

	this.find = function(id, callback) {
		var gSheet = new GSheets(DECIDE_REPOSITORY_GOOGLE_SPREADSHEET_ID)

    	gSheet.findRow('profiles', EMAIL_COLUMN, id, function(result){
    		var profile = JSON.parse(result[JSON_OBJECT_COLUMN])
        	callback(profile)
    	})
	}
}