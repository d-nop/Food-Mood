function displayLoading() {
    $(".searchForm").css("display", "none");
    $(".delivery").css("display", "none");
    $(".loading").css("display", "block");

}

function displayResults() {
    // $(".searchForm").css("display", "none");
    $(".delivery").css("display", "none");
    $(".results").css("display", "block");
    $(".jumbotron > h1").html("Choose Your Mood");
    displayResults.called = true;
    // var pError = $("<p>").html("<b>Sorry, No Deliveries To Your Area</b><hr></hr>");
				// $("div.result").not(".deliverable").append(pError);
}

function displayDelivery() {
    $(".results").css("display", "none");
    $(".delivery").css("display", "block");
    $(".jumbotron > h1").html("Time For Your Delivery!");

}

function displayStatus() {
    $(".loading").css("display", "none");
    $(".delivery").css("display", "none");
    $(".status").css("display", "block");

}

function hideDelivery() {
    $(".delivery").css("display", "none");

}


function hideLoading() {
    $(".loading").css("display", "none");

}


function displaySearchForm() {
    $(".searchForm").css("display", "block");
    $(".results").css("display", "none");

}

function goBack() {
    $("#back-to-search").on("click", function() {
        displaySearchForm();
        $(".jumbotron > h1").html("In the Food Mood?<br /> Look up your Options!");
    })
}

function goBackToResults() {
    $(document).on('click', '#back-to-results', function() {
        // hideDelivery();
        $(".jumbotron > h1").html("Choose Your Mood");
        displayResults();
        $("#deliveryFeeHTML").remove();

    })
}

timeConverter = (utcTime) => {
  console.log("The TIME IN UTC IS "+ utcTime)
  var localTime = new Date(utcTime);
  var amPm = new Date(localTime);
  var options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
  };
  var timeString = amPm.toLocaleString('en-US', options);
  console.log("THE LOCAL TIME IS "+ timeString);
$("#delivery-time").html("<h2>Your Delivery Should Arrive by " + timeString + "</h2>");

    //console.log(localDate);
}



$(document).ready(function() {

    $("#seeResults").on("click", function() {

        $("#dumpResults").empty();

        var backButton = $("<input />", {
            type: 'button',
            value: 'Not in the mood? Go back!',
            class: 'back_button',
		    id: 'back-to-search'
        });
        $("#dumpResults").append(backButton);
        var search = $("#keyTerm").val();
        var enterAddress = $("#addressTerm").val();
        var city = $("#city").val();
        var cityState = $("#city option:selected").text();
        var resultCount = $("#filterResults").val();
        var userAddress = "" + enterAddress + " " + cityState;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://developers.zomato.com/api/v2.1/search?q=" + search + "&entity_id=" + city + "&sort=rating&order=desc&entity_type=city&count=" + resultCount + "",
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
        if (search === "" || enterAddress === "" || city === "Choose Your City") {
            if (search === "") {
                $("#no-results").append("<p style='color: red;'>Please Enter A Keyword</p>");
            }
            if (enterAddress === "") {
                $("#no-results").append("<p style='color: red;'>Please Enter Your Address</p>");
            }
            if (city === "Choose Your City") {
                $("#no-results").append("<p style='color: red;'>Please Enter A City</p>");
            }
        } else {
            function postMateApiDone() {
                if(postMatesApiCounter == resultCount){
                console.log("enable all the buttons");
                hideLoading();
                displayResults();
                goBack();
                }

            }
            let postMatesApiCounter = 0;
        	// hideSearchForm();
            displayLoading();
            $.ajax(settings).done(function(response) {
                console.log(response);
                if (response.results_found == 0) {
                    $("#no-results").html("<p style='color: red;'>Sorry, No Results For That Search</p>")
                    	hideLoading();
                        displaySearchForm();
                }
                

                //response.restaurants[i] = results
                response.restaurants.forEach((results, index, array) => {
                    var restaurantName = results.restaurant.name;
                    var restaurantAddress = results.restaurant.location.address;
                    var restaurantRating = results.restaurant.user_rating.aggregate_rating;
                    var restaurantRatingText = results.restaurant.user_rating.rating_text;
                    var restaurantMenu = results.restaurant.menu_url;
                    var resultDiv = $(`<div class="result" data-pickup-name="${restaurantName}" data-pickup-address="${restaurantAddress}" data-dropoff-address="${userAddress}">`);
                    var headerRestaurantName = $("<h1>").text(restaurantName);
                    var pRestaurantAddress = $("<p>").html("<b>Address: </b>" + restaurantAddress);

                    var pRestaurantRating = $("<p>").html("<b>Rating: </b>" + restaurantRating + " " + restaurantRatingText);

                    // var menuButtonDiv = $('<div />', { 'data-role': 'fieldcontain' });
                    var menuSite = $("<a href='" + restaurantMenu + "' target='_blank'>");
                    var displayMenuButton = $('<button>');
                    displayMenuButton.attr("class", "btn btn-primary btn_a");
                    displayMenuButton.text("Menu");
                    menuSite.append(displayMenuButton);
                    var span = $("<span id='buttons'>");

                    span.append(menuSite);

                    var displayDeliveryButton = $('<button>', );
                    displayDeliveryButton.attr("class", "btn btn-success btn_b");
                    displayDeliveryButton.text("Place Delivery");
                    var pRestaurantRating = $("<p>").html("<b> Rating: </b>" + restaurantRating + " " + restaurantRatingText);

                    resultDiv.append(headerRestaurantName);
                    resultDiv.append(pRestaurantAddress);
                    resultDiv.append(pRestaurantRating);
                    resultDiv.append(span);
                    // resultDiv.append(deliveryButtonDiv);

                    console.log(results.restaurant.name)
                    if (results.restaurant.location.city_id != city) {
                        $("#no-results").html("<p style='color: red;'>Sorry, No Results For That Search</p>");
                        }
                    $("#dumpResults").append(resultDiv);
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
                        "data": form,
                        "error": function(){var pError = $("<p>").html("<b>Sorry, No Deliveries To Your Area</b><hr></hr>");
                            resultDiv.append(pError);}
                    }


                  $.ajax(postMateSettings).done(function(response) {


                        response = JSON.parse(response);
                        console.log(response);
                        console.log("-------------------------");
                        let deliveryFee = (response.fee / 100).toFixed(2);
                        var pDeliveryFee = $("<p id='delivery-fee'>").html("<b>The Delivery Fee is: </b>$" + deliveryFee + "<hr></hr>");
                        var quoteID = response.id;
                        resultDiv.attr('data-quote', quoteID);
                        resultDiv.attr('data-delivery-fee', deliveryFee);
                        resultDiv.append(pDeliveryFee);
                        resultDiv.addClass("deliverable");
                        span.append(displayDeliveryButton);
                        postMatesApiCounter++
                        console.log(postMatesApiCounter);
                        console.log(resultCount);
                        postMateApiDone();
                        
                        
               			// console.log(index);
                  //       console.log(array);
                  //       console.log("----------------");
                  //       console.log(resultCount);
                	//end of postmate ajax call	   
                    }).fail(function() {
                        console.log("failed")
                        postMatesApiCounter++
                        console.log(postMatesApiCounter);
                        console.log(resultCount)
                        postMateApiDone();
                    })
                //end of for each loop  

                }); 
                
                    
				           
                	
				

				$(document).on('click', '.btn_b', function(e){
       			$("#back-to-results").remove();
                $("#deliveryFeeHTML").remove();
       			$(document).scrollTop(0);

                // e.preventDefault();
                var backButton = $("<input />", {
		            type: 'button',
		            value: "Not feelin' it? Go back!",
		            class: 'back_button',
		            id: 'back-to-results'
		        });
        		$(".deliveryForm").prepend(backButton);
                var dropOffAddress = $(this).closest('.result').attr("data-dropoff-address");
                $("#enterDropOffAddress").val(dropOffAddress);

                var pickupName = $(this).closest('.result').attr("data-pickup-name");
                $("#enterPickUpName").val(pickupName);

                var pickupAddress = $(this).closest('.result').attr("data-pickup-address");
                $("#enterPickUpAddress").val(pickupAddress);

                var quoteID = $(this).closest('.result').attr("data-quote");
                // $("#enterCustNumber").val(quoteID);

                var deliveryFee = $(this).closest('.result').attr("data-delivery-fee");

                var deliveryFeeHTML = '<b id="deliveryFeeHTML">Your Delivery Fee Is:  $' + deliveryFee + '<br /><br /><br /></b>'
                $("#dropOffNotes").prepend(deliveryFeeHTML);
                // console.log(test);
                // hideResults();
                displayDelivery();
        		goBackToResults();
        			$('#placeDelivery').on('click', function(){
        				$(".submitInfo").html("Please wait while we process your delivery.")
						displayLoading();
               			var dropOffName = $("#enterDropOffName").val();
                		console.log(dropOffName);
        				var form = new FormData();
						form.append("pickup_address", pickupAddress);
						form.append("dropoff_address", dropOffAddress);
						form.append("pickup_name", pickupName);
						form.append("pickup_phone_number", "404-697-5828");
						form.append("dropoff_name", dropOffName);
						form.append("dropoff_phone_number", "4046669898");
						form.append("manifest", "tuna melt");
						form.append("quote_id", quoteID);
						form.append("robo_pickup", "00:00:10");
						// form.append("robo_pickup_complete", "00:00:20");
						form.append("robo_dropoff", "00:00:20");
						form.append("robo_delivered", "00:00:30");


						var postmateCreateDelivery = {
						  "async": true,
						  "crossDomain": true,
						 "url": "https://cors-anywhere.herokuapp.com/https://api.postmates.com/v1/customers/cus_LXPkZAcVyBksa-/deliveries/",
						  "method": "POST",
						  "headers": {
						    "Authorization": "Basic YTViNGQyYjgtOTIxZS00OTMwLTgzMmQtMmVlZDU2NmZjZTA2Og==",
						    "Cache-Control": "no-cache",
						    "Postman-Token": "80f0e57b-493a-5a20-83ab-eee6341d0853"
						  },
						  "processData": false,
						  "contentType": false,
						  "mimeType": "multipart/form-data",
						  "data": form
						}

						$.ajax(postmateCreateDelivery).done(function (response) {
						  response = JSON.parse( response );
						  console.log(response);
						  var deliveryID = response.id;
						  console.log(deliveryID);
						  				var postmateDeliveryStatus = {
										  "async": true,
										  "crossDomain": true,
										  "url": "https://cors-anywhere.herokuapp.com/https://api.postmates.com/v1/customers/cus_LXPkZAcVyBksa-/deliveries/" + deliveryID,
										  "method": "POST",
										  "headers": {
										    "Authorization": "Basic YTViNGQyYjgtOTIxZS00OTMwLTgzMmQtMmVlZDU2NmZjZTA2Og==",
										    "Cache-Control": "no-cache",
										    "Postman-Token": "cafc9f70-63a1-4201-da64-0d10afa2283d"
										  },
										  "processData": false,
										  "contentType": false,
										  "mimeType": "multipart/form-data"
										}
						  		$.ajax(postmateDeliveryStatus).done(function (response) {
									  response = JSON.parse( response );
									  console.log(response);
									  displayStatus();
                                      // setInterval(function(){},12000)
									  var ajaxCheck = setInterval(function(){
									  	$.ajax(postmateDeliveryStatus).done(function (response) {
													response = JSON.parse( response );
													console.log(response);
													var deliveryStatus = response.status;
													$("#status-animate h1").html(deliveryStatus.charAt(0).toUpperCase() + deliveryStatus.slice(1));
													
													if (deliveryStatus === "pickup_complete"){
														$("#status-animate h1").html("Pickup Complete");
														}
													if (deliveryStatus === "delivered"){
														$("#courier-name").html("<h2>Your Item Has Been Delivered!</h2>");	
														$("#delivery-time").html("");
                                                        clearInterval(ajaxCheck);
														}else if (deliveryStatus === "pickup" || deliveryStatus === "pickup_complete" || deliveryStatus === "dropoff"){
														// var deliveryETA = response.dropoff_deadline;
														// timeConverter(deliveryETA);
														var courier = response.courier.name;
														$("#courier-name").html("<h2>Your courier " + courier + " is on the way!</h2>");
														$("#delivery-time").html("<h3>Your Delivery Should Arrive In Just A Few Minutes</h3>");
														}
												});
									  		}, 12000);
										
									//end of postmateDeliveryStatus ajax call  
									});	


						  	//end of postmateCreateDelivery ajax call
							});


        				//end of #placeDelivery button
        				});

        			//end of .btn_b click handler
                    });
//zomato ajax call closed
            });
//else statement closed
        }
//search form submit closed
    });
//document ready closed

});
