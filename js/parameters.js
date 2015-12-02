function read_query_string(){
    var a=window.location.search.split(/\?/);
    var b=a[1].split("&");
    var c={};
    for(var i=0;i<b.length;i++){
        var d=b[i].split("=");
        c[d[0]]=d[1];
    }
    return c;
}


if(read_query_string()){
	function updateFormValuesFromURL(){
		var data = read_query_string();
		for (prop in data){

			// Frequency of Pay
			if (prop === 'frequency-of-pay')

			// HTML Inputs
			if (document.getElementById(prop)){
				document.getElementById(prop).value = data[prop];
			}
		}
	}
	updateFormValuesFromURL();
}