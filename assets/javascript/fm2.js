function displayResults() {
    $(".results").css("display", "block");

}

function displayLoading() {
    $(".loading").css("display", "block");

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
    $("#back_button").on("click", function() {
        displaySearchForm();
        $(".jumbotron > h1").html("In the Food Mood?<br /> Look up your Options!");
        hideResults();
    })
}



$(document).ready(function() {
var resultsArray = [];
    $("#seeResults").on("click", function() {

        $("#dumpResults").text("");

        var backButton = $("<input />", {
            type: 'button',
            value: 'Not in the mood? Go back!',
            id: 'back_button'
        });
        $("#dumpResults").append(backButton);
        var search = $("#keyTerm").val();
        var enterAddress = $("#addressTerm").val();
        var city = $("#city").val();
        var cityState = $("#city option:selected").text();
        var resultCount = $("#filterResults").val();
        var userAddress = "" + enterAddress + " " + cityState;
        var zomatoSettings = {
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
        console.log(zomatoSettings.url);
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
            } 
        else {
            hideSearchForm();
            displayLoading();
            $.ajax(zomatoSettings).done(function(response) {
                console.log(response);
                if (response.results_found == 0) {
                    $("#no-results").html("<p style='color: red;'>Sorry, No Results For That Search</p>")
                        hideLoading();
                        displaySearchForm();
                    }
                
                //response.restaurants[i] = results
                response.restaurants.forEach((results, index) => {
                    if (results.restaurant.location.city_id != city) {
                        $("#no-results").html("<p style='color: red;'>Sorry, No Results For That Search</p>");
                        }
                    var restaurantName = results.restaurant.name;
                    var restaurantAddress = results.restaurant.location.address;
                    var restaurantRating = results.restaurant.user_rating.aggregate_rating;
                    var restaurantRatingText = results.restaurant.user_rating.rating_text;
                    var restaurantMenu = results.restaurant.menu_url;


                    var form = new FormData();
                            form.append("dropoff_address", userAddress);
                            form.append("pickup_address", restaurantAddress);

                    var postmateSettings = {
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

                    $.ajax(postmateSettings).done(function(response) {
                        response = JSON.parse(response);
                        console.log(response);
                        console.log("-------------------------");
                        let deliveryFee = (response.fee / 100).toFixed(2);
                         //    var obj = {};
                            // obj.restaurant_name = results.restaurant.name;
                            // obj.restaurant_address = results.restaurant.location.address;
                            // obj.delivery_fee = deliveryFee;
                            // console.log(obj);
                            // resultsArray.push(obj);
                        function buildResults(){

                                var resultDiv = $("<div class='result' data-name='" + restaurantName + "' data-address='" + restaurantAddress + "'>");
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
                                 var pDeliveryFee = $("<p id='delivery-fee'>").html("<b>The Delivery Fee is: </b>$" + deliveryFee + "<hr></hr>");
                                        resultDiv.append(pDeliveryFee);
                                        resultDiv.addClass("deliverable");
                                $("#dumpResults").append(resultDiv);
                                if ("div.deliverable"){
                                        span.append(displayDeliveryButton)
                                        }
                            } 
                        buildResults();
                        $(".jumbotron > h1").html("Choose Your Mood");
                        hideLoading();
                        displayResults();
                        goBack();
                       
                        });
                    
            });
                    $(document).on('click', '.btn_b', function(e){
                        e.preventDefault();
                        var test = $(this).closest('.result').attr('data-name');
                        console.log(test);
                    })
                    
					// console.log(resultsArray);
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

            });
        }

    });


});