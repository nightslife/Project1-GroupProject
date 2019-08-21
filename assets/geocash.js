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
  
  // $("#test2").on("click",   })
  
  function getLatLong(address){
      console.log("address: " + address)
      var mapUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + funky.split(",")[0] + fresh.split(";")[1];
  $.ajax({
      url: mapUrl,
      method: "GET"
  }).then(function(resp){
      console.log(resp)
      let latLong = resp.results[0].geometry.location
      console.log(latLong)
      panTo(latLong)
      })
    }
  
  function panTo(latLong){
    map.panTo(
      latLong
   )
  }
  
  // Hide results screen



  $("#test").on("click", function(){
    console.log("moving")
    panTo()
  })
  results()
  
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
    $("#output").empty();
    for(let i = 0; i <=9 ; i++){
        var newRow = $("<tr>")
        newRow.attr("id", i)
        newRow.addClass("rowtoclick") // add Class for CSS styling here)
        newRow.attr("data-title", jobResponse[i].title)
        newRow.attr("data-company", jobResponse[i].company)
        newRow.attr("data-location", jobResponse[i].location)
        newRow.attr("data-description", jobResponse[i].description)
        // newRow.attr("data-url", )
        var newTitle = $("<td>").text(jobResponse[i].title)
        var newCompany = $("<td>").text(jobResponse[i].company)
        var newLocation = $("<td>").text(jobResponse[i].location)
        var thelink = $('<a>', {
          text: "COL Info",
          href: "https://www.numbeo.com/cost-of-living/in/" + jobResponse[i].location.split(",")[0].replace(/ /g, '-') + "?displayCurrency=USD",
        })
        var newURL = $("<td>").append(thelink)
        newRow.append(newTitle, newLocation, newCompany, newURL)
        $("#output").append(newRow)
}
  }

  // $("#searchBtn").on("click",(searchResultsShow));


$("#test").on("click", function(){
  console.log("moving")
  panTo()
})
results()



$("#searchResults").hide();

$("#searchBtn").on("click",function(){
  $("#searchResults").show();
  results()
});

$(document).on("click", ".rowtoclick", function(){
  console.log("thats a row")
  $("#jobTitleModal").text($(this).attr("data-title"))
  $("#locationModal").text($(this).attr("data-location"))
  $("#companyModal").text($(this).attr("data-company"))
  $("#descriptionModal").html($(this).attr("data-description"))
  $("#modal-footer").html($(this).attr("data-description"))
  getLatLong($(this).attr("data-location"))
  // $("#maps").text(this.attr("data-title"))
  console.log("clicked")
  $("#modal").modal("show");
});

});