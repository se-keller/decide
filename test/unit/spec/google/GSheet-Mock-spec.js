describe("GSheet Mock", function() {
  
  var gsheet

  beforeEach(function() {
    gsheet = new GSheets('anysheet')
  });

  it("can find appended values", function() {
  	var result1
    gsheet.append('anysheet', ['value'], function() {
    	gsheet.findRow('anysheet', 1, 'value', function(result){
    		result1 = result
    	}, function() {})
    })
    expect(result1[0]).toEqual('value')	
  });

})