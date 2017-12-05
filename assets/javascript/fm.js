$(document).ready(function(){

var search = "burger";
var city = 288;
var resultCount = 12;
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://developers.zomato.com/api/v2.1/search?q=" + search +"&entity_id=" + city + "&count=" + resultCount + "",
  "method": "GET",
  "headers": {
    "user-key": "78961eb0fa824a1ff1dad4e97f2b1cfd"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});













});