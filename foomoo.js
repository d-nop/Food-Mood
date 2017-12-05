console.log("hello foomoo");
var authKey = "a5b4d2b8-921e-4930-832d-2eed566fce06";

// These variables will hold the results we get from the user's inputs via HTML
var searchTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

// queryURLBase is the start of our API endpoint. The searchTerm will be appended to this when
// the user hits the search button
var customer_id = "cus_LXPkZAcVyBksa-";
var outgoing_address = "20 McAllister St, San Francisco, CA";
var incoming_address = "101 Market St, San Francisco, CA";
var queryURLBase = "https://cors-anywhere.herokuapp.com/https://api.postmates.com/v1/customers/cus_LXPkZAcVyBksa-/delivery_quotes/"

// Counter to keep track of article numbers as they come in
var articleCounter = 0;

// FUNCTIONS
// ==========================================================

// This runQuery function expects two parameters:
// (the number of articles to show and the final URL to download data from)

  // The AJAX function uses the queryURL and GETS the JSON data associated with it.
  // The data then gets stored in the variable called: "NYTData"

//   $.ajax({
//     url: queryURLBase,
//     method: "POST"


// }).done(function(response) {
// 	conzole.log(response);
// });

var form = new FormData();
form.append("dropoff_address", incoming_address);
form.append("pickup_address", outgoing_address);

var settings = {
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

$.ajax(settings).done(function (response) {
  response = JSON.parse( response );
  console.log(response);
  let deliveryFee = response.fee/100;
  console.log("The delivery Fee is "+"$"+deliveryFee);
});

