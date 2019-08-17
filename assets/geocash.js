$(document).ready(function(){


  var funky = "AIzaSyDm478V9Zs2wCwgw,klsahdgldsaigh"
  var fresh = "asjkdhfkladshf;QgxxokXaMs36PEFvYM"
  var latLong = ""
  
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
  var searchInput = "developer"
  var locationInput = ""
  var address = []
  var searchResults = []
  var jobUrl = "https://github-jobs-proxy.appspot.com/positions?description=" + searchInput + "&location=" + locationInput
  // var jobUrl = "https://github-jobs-proxy.appspot.com/positions?description=developer&location=san+francisco"
  var resultComplete = false;
  function results(){
  searchInput = $("#articleCount option:selected").attr("id");
  jobUrl = "https://github-jobs-proxy.appspot.com/positions?description=" + searchInput + "&location=" + locationInput
  $.ajax({
      url: jobUrl,
      method: "GET"
  }).then(function(resp){
      console.log(resp)
      searchResults = resp
      address = resp[0].location.split(",")
      console.log(address)
      console.log(jobUrl)
      return searchResults;
  })
  }
  
  $("#test2").on("click", function latLong(){
      var address = searchResults[0].location
      console.log("address: " + address)
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
      // var lat = resp.results[0].geometry.location.lat
      // var lng = resp.results[0].geometry.location.lng
      let latLong = resp.results[0].geometry.location
      return latLong;
      })
  
  })
  
  
  // Hide results screen
  

  function panTo(x,y){
    map.panTo({
      lat: x,
      lng: y
   })
  }
  $("#test").on("click", function(){
    console.log("moving")
    panTo()
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
  
  
  function searchResultsHide() {
    var x = document.getElementById("searchResults");
    x.style.display = "none";
  }
  
  searchResultsHide();
  
  $("#articleCount").on("change", function(){
  searchInput = $("#articleCount option:selected").text();
  console.log($("#articleCount option:selected").text())
  console.log(searchInput)
  results()
  })

  // Show result screen after click search
  function searchResultsShow() {
    var x = document.getElementById("searchResults");
    x.style.display = "block";
    console.log($("#articleCount option:selected").text())
    makeResultsTable(searchResults)
  }
  
  function makeResultsTable (jobResponse){
    for(let i = 0; i <=9 ; i++){
        var newRow = $("<tr>")
        newRow.attr( "id", i + "element")
        newRow.addClass() // add Class for CSS styling here)
        newRow.attr("data-title", jobResponse[i].title)
        newRow.attr("data-company", jobResponse[i].company)
        newRow.attr("data-location", jobResponse[i].location)
        newRow.attr("data-description", jobResponse[i].description)
        newRow.attr("data-url", jobResponse[i].company_url)
        var newTitle = $("<td>").text(jobResponse[i].title)
        var newCompany = $("<td>").text(jobResponse[i].company +"@"+ jobResponse[i].company_url)
        var newLocation = $("<td>").text(jobResponse[i].location)
        // var newDescription = $("<td>").html(jobResponse[i].description)
        newRow.append(newTitle, newLocation, newCompany)
        $("#output").append(newRow)

}
  }


  $("#searchBtn").on("click",(searchResultsShow));
  
  $("#row1").on("click",function(){
    console.log("clicked")
    $("#modal").modal("show");
  });

}
function panTo(x,y){
  map.panTo({
    lat: x,
    lng: y
 })
}
$("#test").on("click", function(){
  console.log("moving")
  panTo()
})


// on(submitclick){
//   ajaxQuery().then({
//       do{for(job of Results){
//           let newRow = $("<tr>")
//           var newTitle = newCompany = newLocation = newDescription = newURL = $("<td>")
//           newTitle.text(job.title)
//           newCompany.text(job.company)
//           newLocation.text(job.location)
//           newDescription.text(job.description)
//           newURL.text(job.company_url)
//           newRow.append()
//           i++
          
//       }}
//       while(i<10)
//   })
// }
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

$("#searchResults").hide();

$("#searchBtn").on("click",function(){
  $("#searchResults").show();
});

$("#row1").on("click",function(){
  console.log("clicked")
  $("#modal").modal("show");
});


// final
});


