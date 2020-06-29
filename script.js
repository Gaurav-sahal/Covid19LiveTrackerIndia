

$.getJSON("https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true",
	function(data){
		console.log(data);

		var scriptUpdatedTime = data.lastUpdatedAtApify;
		console.log(scriptUpdatedTime);

		var scriptActiveCases = data.activeCases;
		var scriptRecovered = data.recovered;
		var scriptDeaths = data.deaths;
		var scriptTotalCases = data.totalCases;
		
		var json = JSON.stringify(scriptUpdatedTime); 
		var dateStr = JSON.parse(json);  
		console.log(dateStr);         
		var date = new Date(dateStr);
		console.log(date);

		$(".indexActiveCases").append(scriptActiveCases);
		$(".indexRecovered").append(scriptRecovered);
		$(".indexDeaths").append(scriptDeaths);
		$(".indexTotalCases").append(scriptTotalCases);
		$(".indexUpdatedTime").append("Last Refreshed: "+ date);
	}
		
);

var scriptState;  // = "bihar";

function searchRegion() {

	$(".indexState").empty();
	$(".indexStateDeceased").empty();
	$(".indexStateRecovered").empty();
	$(".indexStateTotalCases").empty();
	$(".indexStateTotalInfected").empty();

	document.getElementById("middle_detail").style.visibility="visible";	
	document.getElementById("DistrictSearch").style.visibility="visible";
	document.getElementById("lower_detail").style.visibility="hidden";
	// document.getElementById("indexDistrict").reset();
	document.getElementById('indexDistrict').value = '';

	scriptState = document.getElementById("indexDropdownRegion").value;
	//console.log(scState);

	$.getJSON("https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true",
		function(data){
	
			console.log(scriptState);

			var found = 0;
			for (var i = 0; i < Object.keys(data.regionData).length; i++){
				if (data.regionData[i].region == scriptState){
	        		found = 1;
	        		$(".indexState").append("State: "+scriptState);
					$(".indexStateDeceased").append("Deaths: "+data.regionData[i].deceased);
					$(".indexStateRecovered").append("Recovered: "+data.regionData[i].recovered);
					$(".indexStateTotalCases").append("Total Cases: "+data.regionData[i].totalCases);
					$(".indexStateTotalInfected").append("Total Infected: "+data.regionData[i].totalInfected);
	        		break
	    		}
			}
			if(found==0){
				$(".indexState").append("Region not found!");
	    	}
		}		
	);

	let dropdown = $('#indexDistrict');

	dropdown.empty();

	dropdown.append('<option selected="true" disabled>Choose a District</option>');
	dropdown.prop('selectedIndex', 0);

	const url = 'https://api.covid19india.org/state_district_wise.json';

	// Populate dropdown with list of districts
	$.getJSON(url, function (data) {
	  $.each(data[scriptState].districtData, function (key) {
	     dropdown.append($('<option></option>').attr('value', key).text(key));
	    // if(key == scriptState){
	    	console.log("District "+key);
	    //	console.log("This is entry"+entry);
	    // }
	    // else{
	    // 	console.log("Region not found!");
	    // }
	  })
	});
}

function searchDistrict(){

	$(".indexDistrict").empty();
	$(".indexDistrictConfirmed").empty();
	$(".indexDistrictRecovered").empty();
	$(".indexDistrictActive").empty();
	$(".indexDistrictDeceased").empty();
	$(".indexDistrictErrorCase").empty();

	var scriptDistrict = document.getElementById("indexDistrict").value;

	$.getJSON("https://api.covid19india.org/state_district_wise.json",
		function(data){

			// var scriptDistrict = document.getElementById("indexDistrict").value;
			if(data[scriptState].districtData[scriptDistrict]){

				document.getElementById("lower_detail").style.visibility="visible";

				console.log(scriptState);	
				console.log(scriptDistrict);
				var districtActive = data[scriptState].districtData[scriptDistrict].active;
				var districtConfirmed = data[scriptState].districtData[scriptDistrict].confirmed;
				var districtDeceased = data[scriptState].districtData[scriptDistrict].deceased;
				var districtRecovered = data[scriptState].districtData[scriptDistrict].recovered;

				$(".indexDistrict").append("District: "+scriptDistrict);
				$(".indexDistrictConfirmed").append("Total Confirmed: "+districtConfirmed);
				$(".indexDistrictRecovered").append("Recovered: "+districtRecovered);
				$(".indexDistrictActive").append("Total Active: "+districtActive);
				$(".indexDistrictDeceased").append("Total Deceased: "+districtDeceased);

			}
			else{
				$(".indexDistrictErrorCase").append("District Not Found! Please check Spelling");
				document.getElementById("lower_detail").style.visibility="hidden";
				console.log("District Not Found! Please check Spelling");
			}
		
		}
	);

	

}




