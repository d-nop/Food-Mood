function displayResults(){
	$(".results").css("display", "block");

}

function hideResults(){
	$(".results").css("display", "none");

}
function hideSearchForm(){
	$(".searchForm").css("display", "none");

}
function displaySearchForm(){
	$(".searchForm").css("display", "block");

}


$(document).ready(function(){


$("#seeResults").on("click", function(){


var search = $("#keyTerm").val();
var city = $("#city").val();
var resultCount = $("#filterResults").val();
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://developers.zomato.com/api/v2.1/search?q=" + search +"&entity_id=" + city + "&sort=rating&order=desc&entity_type=city&count=" + resultCount + "",
  "method": "GET",
  "headers": {
    "user-key": "78961eb0fa824a1ff1dad4e97f2b1cfd"
  }
}

console.log(search);
console.log(city);
console.log(resultCount);
console.log(settings.url);
$("#no-results").empty();
if (search === ""){
		$("#no-results").append("<p style='color: red;'>Please Enter A Keyword</p>");
	}if (city === "Choose Your City"){
			$("#no-results").append("<p style='color: red;'>Please Enter A City</p>")			
	}else {
$.ajax(settings).done(function (response) {
	console.log(response);
	if (response.results_found == 0){
	$("#no-results").html("<p style='color: red;'>Sorry, No Results For That Search</p>")
	}
	response.restaurants.forEach((results, index)=>{
		var restaurantName = results.restaurant.name;
		var restaurantAddress = results.restaurant.location.address;
		var restaurantRating = results.restaurant.user_rating.aggregate_rating;
		var restaurantRatingText = results.restaurant.user_rating.rating_text;
		var resultDiv = $("<div class='result' data-name='" + restaurantName + "' data-address='" + restaurantAddress + "'>");
		var headerRestaurantName = $("<h1>").text(restaurantName);
		var pRestaurantAddress = $("<p>").html("<b>Address: </b>" + restaurantAddress);
		var pRestaurantRating = $("<p>").html("<b>Rating: </b>" + restaurantRating + " " + restaurantRatingText);

		resultDiv.append(headerRestaurantName);
		resultDiv.append(pRestaurantAddress);
		resultDiv.append(pRestaurantRating);


		console.log(results.restaurant.name)
		if (results.restaurant.location.city_id == city){
			hideSearchForm();
			$(".jumbotron > h1").html("Choose Your Mood");
			displayResults();
			$("#dumpResults").append(resultDiv);
 	 		// $("#no-results").empty();
		}else{
			$("#no-results").html("<p style='color: red;'>Sorry, No Results For That Search</p>")
		}
	});
		
		// if (response.restaurants[i] == undefined){
 	//  				$("#no-results").html("<p style='color: red;'>Sorry, No Results For That Search</p>")
		// }else if (response.restaurants[i].restaurant.location.city_id == city){
		// 	hideSearchForm();
		// 	displayResults();
		// 	$("#dumpResults").append(
		// 	response.restaurants[i].restaurant.name);
 	//  		// $("#no-results").empty();
		// }else{
		// 	$("#no-results").html("<p style='color: red;'>Sorry, No Results For That Search</p>")
		// }
	
});
}

	});














});
