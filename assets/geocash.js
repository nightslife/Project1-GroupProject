var funky = "AIzaSyDm478V9Zs2wCwgw,klsahdgldsaigh"
var fresh = "asjkdhfkladshf;QgxxokXaMs36PEFvYM"
var searchInput = "developer"
var locationInput = ""
var address = []
var searchResults = []
var jobUrl = "https://github-jobs-proxy.appspot.com/positions?description=" + searchInput + "&location=" + locationInput
// var jobUrl = "https://github-jobs-proxy.appspot.com/positions?description=developer&location=san+francisco"
var resultComplete = false;
function results(){
$.ajax({
    url: jobUrl,
    method: "GET"
}).then(function(resp){
    console.log(resp)
    searchResults = resp
    address = resp[0].location.split(",")
    console.log(address)
    return address
})
}

$("#testing").on("click", function latLong(){
    console.log(this)
    console.log(searchResults)
    var address = searchResults[0].location.split(",")
    console.log(address)
    if (address.length > 1){
    var mapUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address[0].trim() + ",+" + address[1].trim() + "&key=" + funky.split(",")[0] + fresh.split(";")[1];
}else{
    var mapUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address[0].trim() + "&key=" + funky.split(",")[0] + fresh.split(";")[1];
}

    // var mapUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + "Hamburg" + ",+" + "Germany" + "&key="
$.ajax({
    url: mapUrl,
    method: "GET"
}).then(function(resp){
    console.log(resp)
    console.log(address[0] + ",+" + address[1])
    let latLong = resp.results[0].geometry.location
    var map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: latLong.lat, long: latLong.long},
        zoom: 8
      });
    }
})
})


results()




// $.ajax({})
// .then(function(response1) {

//     return(response1);

// })
// .then(function(response2) {

//     console.log(response2)
//     return $.ajax({});

// })
// .then(function(response3) {



// })
// .catch(function(error) {
//     console.log(error);
// })

// var promise = new Promise(function(resolve, reject) {
//     results()
//     if (resultComplete) {
//       resolve("Stuff worked!");
//     }
//     else {
//       reject(Error("It broke"));
//     }
//   });




// this.on("click", function()){
//     address = jobSearch[0].location[0]
// }




