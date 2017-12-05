$(document).ready(function(){

$("#seeResults").on("click", function(){


var search = $("#keyTerm").val();
var city = $("#city").val();
var resultCount = $("#filterResults").val();
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://developers.zomato.com/api/v2.1/search?q=" + search +"&entity_id=" + city + "&count=" + resultCount + "",
  "method": "GET",
  "headers": {
    "user-key": "78961eb0fa824a1ff1dad4e97f2b1cfd"
  }
}

console.log(search);
console.log(city);
console.log(resultCount);

$.ajax(settings).done(function (response) {
	for (var i = 0; i < response.restaurants; i++){}
		if (response.restaurants[i] == undefined){
 	 				$("#no-results").html("<p style='color: red;'>Sorry, No Results For That Search</p>")
		}else if (response.restaurants[i].restaurant.location.city_id == city){
			console.log(response);
 	 		$("#no-results").empty();
		}else{
			$("#no-results").html("<p style='color: red;'>Sorry, No Results For That Search</p>")
		}
	
});

	})














});