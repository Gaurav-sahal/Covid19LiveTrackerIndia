
/* THIS FUNCTION STARTS AT THE TIME OF RELOAD OF PAGE */
var mainUrl = "https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true";
$.getJSON(mainUrl, function(data)
	{
		console.log(data);	//PRINTS OUT ALL THE JSON DATA IN THE CONSOLE

		var scriptUpdatedTime = data.lastUpdatedAtApify;
		//console.log(scriptUpdatedTime);
		var scriptActiveCases = data.activeCases;
		var scriptRecovered = data.recovered;
		var scriptDeaths = data.deaths;
		var scriptTotalCases = data.totalCases;
		
		var json = JSON.stringify(scriptUpdatedTime); //CONVERTS DATE/TIME INTO STRING FORMAT
		var dateStr = JSON.parse(json);  
		//console.log(dateStr);         
		var date = new Date(dateStr);
		console.log("Last Updated "+date);	//PRINTS LAST REFRESHED TIME IN THE CONSOLE

		/* PUTTING THE VARIABLES DATA TO THE UPPER DETAIL SECTION */
		$(".indexActiveCases").append(scriptActiveCases);
		$(".indexRecovered").append(scriptRecovered);
		$(".indexDeaths").append(scriptDeaths);
		$(".indexTotalCases").append(scriptTotalCases);
		$(".indexUpdatedTime").append("Last Refreshed: "+ date);
	}
		
);

var scriptState;  // DECLARING THIS VARIABLE GLOBALLY

/* THIS FUNCTION WILL BE CALLED WHEN CLICKED ON SEARCH BUTTON AFTER SELECTING A STATE */
function searchRegion() {

	/* BELOW 5 COMMANDS WILL ERASE THE PREVIOUS CONTAINED DATA */
	$(".indexState").empty();
	$(".indexStateDeceased").empty();
	$(".indexStateRecovered").empty();
	$(".indexStateTotalCases").empty();
	$(".indexStateTotalInfected").empty();

	/* BELOW COMMANDS WILL UNHIDE/HIDE PARTICULAR FIELDS */
	document.getElementById("middle_detail").style.visibility="visible";	
	document.getElementById("DistrictSearch").style.visibility="visible";
	document.getElementById("lower_detail").style.visibility="hidden";
	// document.getElementById("indexDistrict").reset();
	document.getElementById('indexDistrict').value = '';

	scriptState = document.getElementById("indexDropdownRegion").value;	//CHOOSEN VALUE OF STATE IS ASSIGNED TO THE GIVEN FIELD
	console.log("CHOOSE A STATE: "+scriptState);	//PRINTS THE SELECTED STATE


	/* BELOW JQUERY PUT THE RESPECTIVE STATE DATA TO THE MIDDLE DETAIL SECTION FIELD  */
	$.getJSON(mainUrl, function(data)
		{
			var found = 0;
			for (var i = 0; i < Object.keys(data.regionData).length; i++){
				if (data.regionData[i].region == scriptState){
	        		found = 1;
	        		/* PUTTING THE VARIABLES DATA TO THE MIDDLE DETAIL SECTION */
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

	const url = 'https://api.covid19india.org/state_district_wise.json';	//URL OF POSTMAN API

	/* BELOW JQUERY POPULATES DROPDOWN WITH LIST OF DISTRICTS */  
	$.getJSON(url, function (data) {
		console.log("AVAILABLE DISTRICTS");		//PRINTS AVAILABLE DISTRICTS OF SELECTED STATE
	  $.each(data[scriptState].districtData, function (key) {

	    dropdown.append($('<option></option>').attr('value', key).text(key));
	    console.log(key);	//PRINTS OUT ALL THE DISTRICTS OF RESPECTIVE STATE

	  })
	});
}

/* THIS FUNCTION WILL BE CALLED WHEN CLICKED ON SEARCH BUTTON AFTER SELECTING A DISTRICT */
function searchDistrict(){

	/* BELOW 6 COMMAND ERASE THE PREVIOUS CONTAINED DATA OF GIVEN FIELDS OF LOWER DETAIL SECTION */
	$(".indexDistrict").empty();
	$(".indexDistrictConfirmed").empty();
	$(".indexDistrictRecovered").empty();
	$(".indexDistrictActive").empty();
	$(".indexDistrictDeceased").empty();
	$(".indexDistrictErrorCase").empty();

	var scriptDistrict = document.getElementById("indexDistrict").value;

	const url = 'https://api.covid19india.org/state_district_wise.json';	//URL OF POSTMAN API

	$.getJSON(url, function(data)
		{
			// var scriptDistrict = document.getElementById("indexDistrict").value;
			/* IF CHOOSEN STATE IS EQUAL TO FOUND STATE, THEN BELOW CODE EXECUTE */
			if(data[scriptState].districtData[scriptDistrict]){

				document.getElementById("lower_detail").style.visibility="visible";		//UNHIDE LOWER DETAIL SECTION

				console.log("SELECTED STATE: "+scriptState);	
				console.log("SELECTED DISTRICT: "+scriptDistrict);
				var districtActive = data[scriptState].districtData[scriptDistrict].active;
				var districtConfirmed = data[scriptState].districtData[scriptDistrict].confirmed;
				var districtDeceased = data[scriptState].districtData[scriptDistrict].deceased;
				var districtRecovered = data[scriptState].districtData[scriptDistrict].recovered;

				/* PUTTING THE VARIABLES DATA TO THE LOWER DETAIL SECTION */
				$(".indexDistrict").append("District: "+scriptDistrict);
				$(".indexDistrictConfirmed").append("Total Confirmed: "+districtConfirmed);
				$(".indexDistrictRecovered").append("Recovered: "+districtRecovered);
				$(".indexDistrictActive").append("Total Active: "+districtActive);
				$(".indexDistrictDeceased").append("Total Deceased: "+districtDeceased);

			}
			else{
				$(".indexDistrictErrorCase").append("District Not Found! Please check Spelling");	//PRINTS OUT IF SOMETHING GOES WRONG
				document.getElementById("lower_detail").style.visibility="hidden";
				console.log("District Not Found! Please check Spelling");
			}
		
		}
	);
}




