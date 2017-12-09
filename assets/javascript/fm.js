function displayResults() {
    $(".results").css("display", "block");
    $(".jumbotron > h1").html("Choose Your Mood");
    displayResults.called = true;
    var pError = $("<p>").html("<b>Sorry, No Deliveries To Your Area</b><hr></hr>");
				$("div.result").not(".deliverable").append(pError);
}

function displayLoading() {
    $(".loading").css("display", "block");

}

function displayDelivery() {
    $(".delivery").css("display", "block");
    $(".jumbotron > h1").html("Time For Your Delivery!");

}

function hideDelivery() {
    $(".delivery").css("display", "none");

}

function hideResults() {
    $(".results").css("display", "none");

}

function hideLoading() {
    $(".loading").css("display", "none");

}

function hideSearchForm() {
    $(".searchForm").css("display", "none");

}

function displaySearchForm() {
    $(".searchForm").css("display", "block");

}

function goBack() {
    $(".back_button").on("click", function() {
        displaySearchForm();
        $(".jumbotron > h1").html("In the Food Mood?<br /> Look up your Options!");
        hideResults();
    })
}

function goBackToResults() {
    $(document).on('click', '.back_button', function() {
        hideDelivery();
        $(".jumbotron > h1").html("Choose Your Mood");
        displayResults();
        $("#deliveryFeeHTML").remove();

    })
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
        	hideSearchForm();
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
                    // var deliveryButtonDiv = $('<div />', { 'data-role': 'fieldcontain' });
                    // var postmateSite = $("<a href='https://postmates.com' target='_blank'>");
                    var displayDeliveryButton = $('<button>', );
                    displayDeliveryButton.attr("class", "btn btn-success btn_b");
                    displayDeliveryButton.text("Place Delivery");
                    // span.append(displayDeliveryButton);
                    // deliveryButtonDiv.append(displayDeliveryButton);


                    // postmateSite.append(displayDeliveryButton);
                    // menuButtonDiv.append(menuSite).appendTo($('#pg_menu_content').empty());
                    // deliveryButtonDiv.append(postmateSite).appendTo($("pg_menu_content").empty());


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
                        "data": form
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
                        if ("div.deliverable"){
                        span.append(displayDeliveryButton)
                    	}
               			
                			if (index === array.length - 1){ 
       								console.log("Last callback call at index " + index + " with value " + results ); 
  								 // noDelivery();
  								 setTimeout(function() {
  								 	hideLoading();
               						displayResults();
                					goBack();
  								 }, 2000);

  								 }
                	//end of postmate ajax call	   
                    });
                //end of for each loop    
                });
				
					
                	
				

				$(document).on('click', '.btn_b', function(e){
       			$("#back-to-results").remove();
       			$(document).scrollTop(0);

                // e.preventDefault();
                var backButton = $("<input />", {
		            type: 'button',
		            value: "Not feelin' it? Go back!",
		            class: 'back_button',
		            id: 'back-to-results'
		        });
        		$(".deliveryForm").prepend(backButton);
                var dropOffName = $("#enterDropOffName").val();
                var dropOffAddress = $(this).closest('.result').attr("data-dropoff-address");
                $("#enterDropOffAddress").val(dropOffAddress);
                var pickupName = $(this).closest('.result').attr("data-pickup-name");
                $("#enterPickUpName").val(pickupName);
                var pickupAddress = $(this).closest('.result').attr("data-pickup-address");
                $("#enterPickUpAddress").val(pickupAddress);
                var quoteID = $(this).closest('.result').attr("data-quote");
                $("#enterCustNumber").val(quoteID);
                var deliveryFee = $(this).closest('.result').attr("data-delivery-fee");
                var deliveryFeeHTML = '<b id="deliveryFeeHTML">Your Delivery Fee Is:  $' + deliveryFee + '<br /><br /><br /></b>'
                $("#dropOffNotes").prepend(deliveryFeeHTML);
                // console.log(test);
                hideResults();
                displayDelivery();
        		goBackToResults();


                    })
					
					// $.ajax(postMateSettings).done(function(response) {
     //            var pError = $("<p>").html("<b>Sorry, No Deliveries To Your Area</b><hr></hr>");
     //            setTimeout(function() {
     //                $("div.result").not(".deliverable").append(pError)
     //            	}, 5000);
     //            });
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
//zomato ajax call closed
            });
//else statement closed
        }
//search form submit closed
    });

//document ready closed
});