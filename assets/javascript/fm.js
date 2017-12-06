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
function goBack(){
	$( "#back_button" ).on("click", function(){
		displaySearchForm();
		hideResults();
	})
}


$(document).ready(function(){


$("#seeResults").on("click", function(){

$("#dumpResults").text("");

var backButton = $("<input />", {
			type : 'button',
			value : 'Not in the mood? Go back!',
			id : 'back_button'
		});
$("#dumpResults").append(backButton);
var search = $("#keyTerm").val();
var enterAddress = $("#addressTerm").val();
var city = $("#city").val();
var cityState = $("#atlanta").text();
var resultCount = $("#filterResults").val();
var userAddress = "" + enterAddress + " " + cityState;
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://developers.zomato.com/api/v2.1/search?q=" + search +"&entity_id=" + city + "&sort=rating&order=desc&entity_type=city&count=" + resultCount + "",
  "method": "GET",
  "headers": {
    "user-key": "78961eb0fa824a1ff1dad4e97f2b1cfd"
  }
}



console.log(enterAddress);
console.log(city);
console.log(cityState);
console.log(userAddress)
console.log(search);
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

//response.restaurants[i] = results
	response.restaurants.forEach((results, index)=>{
		var restaurantName = results.restaurant.name;
		var restaurantAddress = results.restaurant.location.address;
		var restaurantRating = results.restaurant.user_rating.aggregate_rating;
		var restaurantRatingText = results.restaurant.user_rating.rating_text;
		var restaurantMenu = results.restaurant.menu_url;
		var resultDiv = $("<div class='result' data-name='" + restaurantName + "' data-address='" + restaurantAddress + "'>");
		var headerRestaurantName = $("<h1>").text(restaurantName);
		var pRestaurantAddress = $("<p>").html("<b>Address: </b>" + restaurantAddress);

		var pRestaurantRating = $("<p>").html("<b>Rating: </b>" + restaurantRating + " " + restaurantRatingText);
		var menuButtonDiv = $('<div />', {'data-role' : 'fieldcontain'});
		var menuSite = $("<a href='" + restaurantMenu +"' target='_blank'>");
    	var displayMenuButton = $('<input />', {
              type  : 'button',
              value : 'Menu',
              id    : 'btn_a',
          });
        menuSite.append(displayMenuButton);
		var deliveryButtonDiv = $('<div />', {'data-role' : 'fieldcontain'});
		var postmateSite = $("<a href='https://postmates.com' target='_blank'>");
    	 var displayDeliveryButton = $('<input />', {
              type  : 'button',
              value : 'Place Delivery',
              id    : 'btn_b',
          });
        postmateSite.append(displayDeliveryButton);
	menuButtonDiv.append(menuSite).appendTo( $('#pg_menu_content').empty() );
	deliveryButtonDiv.append(postmateSite).appendTo( $("pg_menu_content").empty() );


		var pRestaurantRating = $("<p>").html("<b> Rating: </b>" + restaurantRating + " " + restaurantRatingText);






		resultDiv.append(headerRestaurantName);
		resultDiv.append(pRestaurantAddress);
		resultDiv.append(pRestaurantRating);
		resultDiv.append(menuButtonDiv);
		resultDiv.append(deliveryButtonDiv);


		console.log(results.restaurant.name)
		if (results.restaurant.location.city_id == city){
			hideSearchForm();
			$(".jumbotron > h1").html("Choose Your Mood");
			displayResults();
			$("#dumpResults").append(resultDiv);
 	 		// $("#no-results").empty();
 	 		goBack();
		}else{
			$("#no-results").html("<p style='color: red;'>Sorry, No Results For That Search</p>")
		}
		var form = new FormData();
 form.append("dropoff_address", userAddress);
 form.append("pickup_address", restaurantAddress);

 var postMateSettings = {
   "async": true,
   "crossDomain": true,
   "url": "https://cors-anywhere.herokuapp.com/https://api.postmates.com/v1/customers/cus_LXPkZAcVyBksa-/delivery_quotes",
   "method": "POST",
   "headers": {
     "Authorization": "Basic YTViNGQyYjgtOTIxZS00OTMwLTgzMmQtMmVlZDU2NmZjZTA2Og==",
     "Cache-Control": "no-cache",
     "Postman-Token": "fd32b0c3-4fbf-eacf-5604-b74f9fe30230"
   },
   "processData": false,
   "contentType": false,
   "mimeType": "multipart/form-data",
   "data": form
 }
$.ajax(postMateSettings).done(function (response) {
   response = JSON.parse( response );
   console.log(response);
   let deliveryFee = response.fee/100;
   var pDeliveryFee = $("<p>").html("<b>The Delivery Fee is: </b>$" + deliveryFee + "<hr></hr>");
   console.log("The delivery Fee is "+"$"+deliveryFee);
	resultDiv.append(pDeliveryFee);

 });
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


 // var authKey = "a5b4d2b8-921e-4930-832d-2eed566fce06";


 // var customer_id = "cus_LXPkZAcVyBksa-";
 // // var outgoing_address = "atlanta, ga.  3632 Boulder Run Road";
 // var incoming_address = "999 peachtree st ne, atlanta, ga";
 // var queryURLBase = "https://cors-anywhere.herokuapp.com/https://api.postmates.com/v1/customers/cus_LXPkZAcVyBksa-/delivery_quotes/"



// // FUNCTIONS
// // ==========================================================





 



// $(document).on("click","input-delivery-submit", function(){
//     event.(preventDefault);

//     let incoming_address = $("#input-delivery-text").val().trim();
//     let outgoing_address = //need object call from Lavelle for Zomato

//     var form = new FormData();
//     form.append("dropoff_address", incoming_address);
//     form.append("pickup_address", outgoing_address);

//   var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://cors-anywhere.herokuapp.com/https://api.postmates.com/v1/customers/cus_LXPkZAcVyBksa-/delivery_quotes",
//     "method": "POST",
//     "headers": {
//     "Authorization": "Basic YTViNGQyYjgtOTIxZS00OTMwLTgzMmQtMmVlZDU2NmZjZTA2Og==",
//     "Cache-Control": "no-cache",
//     "Postman-Token": "fd32b0c3-4fbf-eacf-5604-b74f9fe30230"
//   },
//     "processData": false,
//     "contentType": false,
//     "mimeType": "multipart/form-data",
//     "data": form
// }

// $.ajax(settings).done(function (response) {
//    response = JSON.parse(response);
//     console.log(response);
//     let deliveryFee = response.fee/100;
//     $("#grabDivfromKaraandDan").text("The delivery Fee is "+"$"+deliveryFee);
//     console.log("The delivery Fee is "+"$"+deliveryFee);
// });


// });











});
