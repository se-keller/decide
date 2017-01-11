function OAuth() {

  var isLoggedIn = false

  this.isLoggedIn = function(callback) {
    callback(isLoggedIn)
  }

  this.login = function(callback, noLoginCallback) {
  	isLoggedIn = true
    callback()
  }

  this.logout = function(callback) {
  	this.isLoggedIn = false
    callbck()
  }

  
}
