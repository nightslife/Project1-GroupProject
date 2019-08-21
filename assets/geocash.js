$(document).ready(function(){


  var funky = "AIzaSyDm478V9Zs2wCwgw,klsahdgldsaigh"
  var fresh = "asjkdhfkladshf;QgxxokXaMs36PEFvYM"
  var searchInput = "developer"
  var locationInput = ""
  var address = []
  var searchResults = []
  var jobUrl = "https://github-jobs-proxy.appspot.com/positions?description=" + searchInput + "&location=" + locationInput
  

  
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
    }).then(function(searchResults){
      makeResultsTable(searchResults)
    })
  }

  function makeResultsTable (jobResponse){
    $("#output").empty();
    for(let i = 0; i <=9 ; i++){
        var newRow = $("<tr>")
        newRow.attr("id", i)
        // newRow.addClass("rowtoclick")
        newRow.attr("data-title", jobResponse[i].title)
        newRow.attr("data-company", jobResponse[i].company)
        newRow.attr("data-location", jobResponse[i].location)
        newRow.attr("data-description", jobResponse[i].description)
        newRow.attr("data-url", jobResponse[i].company_url)
        var newTitle = $("<td>").text(jobResponse[i].title).addClass("rowtoclick")
        var newCompany = $("<td>").text(jobResponse[i].company).addClass("rowtoclick")
        var newLocation = $("<td>").text(jobResponse[i].location).addClass("rowtoclick")
        var newWinLink = "https://www.numbeo.com/cost-of-living/in/" + jobResponse[i].location.split(",")[0].replace(/ /g, '-') + "?displayCurrency=USD";
        var thelink = $('<a>', {
          text: jobResponse[i].location + " CoL Info",
          title: newWinLink,
          href: "#"
        })
        newRow.attr("data-colUrl", newWinLink)
        var newURL = $("<td>").append(thelink).addClass("colLink")
        newRow.append(newTitle, newLocation, newCompany, newURL)
        $("#output").append(newRow)
}
  }

$("#test").on("click", function(){
  console.log("moving")
  panTo()
})

$("#searchResults").hide();

$("#searchBtn").on("click",function(){
  results()
  $("#searchResults").show();
});

$(document).on("click", ".colLink", function(){
  window.open($(this).parent().attr("data-colUrl"))
  })



$(document).on("click", ".rowtoclick", function(){
  var URL = $('<a>', {
    text: "Company Website",
    href: $(this).parent().attr("data-url")
  })
  console.log("thats a row")
  $("#jobTitleModal").text($(this).parent().attr("data-title"))
  $("#locationModal").text("Location: " + $(this).parent().attr("data-location"))
  $("#companyModal").text("Company: " + $(this).parent().attr("data-company"))
  $("#companyURL").html(URL)
  $("#descriptionModal").html($(this).parent().attr("data-description"))
  // $("#modal-footer").html($(this).parent().attr("data-description"))
  getLatLong($(this).parent().attr("data-location"))
  console.log("clicked")
  $("#modal").modal("show");
});

});