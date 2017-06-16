preAllocation.filter('lookupType', function() {

  return function(input, optional1, optional2) {
    console.log('working',input, optional1, optional2)
    var output;
    var i = 0;
    var temp = []
    for ( i = 0; i < input.length; i++){
        if(input[i][optional1] == optional2){
            temp.push(input[i]);
        }
    }
    console.log(temp.length > 0 ? temp : output)
    return output = temp.length > 0 ? temp : output;
  }

});