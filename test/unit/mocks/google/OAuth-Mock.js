function OAuth() {

  var isLoggedIn = false

  this.isLoggedIn = function(callback) {
    callback(isLoggedIn)
  }

  this.login = function(callback) {
  	isLoggedIn = true
    callback()
  }

  this.logout = function(callback) {
  	this.isLoggedIn = false
    callbck()
  }

  
}
