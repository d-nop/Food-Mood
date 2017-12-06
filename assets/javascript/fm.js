
var authKey = "a5b4d2b8-921e-4930-832d-2eed566fce06";


var customer_id = "cus_LXPkZAcVyBksa-";
var outgoing_address = "9 palisades rd ne, atlanta, ga";
var incoming_address = "999 peachtree st ne, atlanta, ga";
var queryURLBase = "https://cors-anywhere.herokuapp.com/https://api.postmates.com/v1/customers/cus_LXPkZAcVyBksa-/delivery_quotes/"



// FUNCTIONS
// ==========================================================



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



$(document).on("click","input-delivery-submit", function(){
    event.(preventDefault);

    let incoming_address = $("#input-delivery-text").val().trim();
    let outgoing_address = //need object call from Lavelle for Zomato

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
   response = JSON.parse(response);
    console.log(response);
    let deliveryFee = response.fee/100;
    $("#grabDivfromKaraandDan").text("The delivery Fee is "+"$"+deliveryFee);
    console.log("The delivery Fee is "+"$"+deliveryFee);
});


});


