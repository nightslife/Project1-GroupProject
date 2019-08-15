$(document).ready(function(){

//menu first page -open
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }
 
//menu first page -close
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
  }

// Field menu begin


// Field menu end

  
var searchInput = "developer"
var locationInput = ""
var address = []
var jobUrl = "https://github-jobs-proxy.appspot.com/positions?description=" + searchInput + "&location=" + locationInput
// var jobUrl = "https://github-jobs-proxy.appspot.com/positions?description=developer&location=san+francisco"
$.ajax({
    url: jobUrl,
    method: "GET"
}).then(function(resp){
    console.log(resp)
    address = resp[0].location.split(",")
    console.log(address)
    var mapUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address[0].trim() + ",+" + address[1].trim() + "&key=AIzaSyD_dat8VpQsQpAHjRFKdYLjjq4LMlfTS2c"
    // var mapUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + "Hamburg" + ",+" + "Germany" + "&key=AIzaSyD_dat8VpQsQpAHjRFKdYLjjq4LMlfTS2c"
    $.ajax({
    url: mapUrl,
    method: "GET"
}).then(function(resp){
    console.log(resp)
    console.log(address[0] + ",+" + address[1])
})
})

// this.on("click", function()){
//     address = jobSearch[0].location[0]
// }

function searchResultsHide() {
  var x = document.getElementById("searchResults");
  x.style.display = "none";
}

searchResultsHide();

function searchResultsShow() {
  var x = document.getElementById("searchResults");
  x.style.display = "block";
}

$("#searchBtn").on("click",(searchResultsShow))


// final
});