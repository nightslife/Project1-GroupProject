$(document).ready(function(){
// Global variables for ease of use and obfuscation
  var funky = "AIzaSyDm478V9Zs2wCwgw,klsahdgldsaigh";
  var fresh = "asjkdhfkladshf;QgxxokXaMs36PEFvYM";
  var searchResults = []
  var curPage = 0
//--------------------------------------------------


//==========================================
//==============Function List===============
//==========================================


// Function: Moves Google Map focus based on Lat/Long object
  function panTo(latLong){
    map.panTo(
      latLong
   )
  }

// Function: Gets the Latitude and Longitude for the first address of the job posting (if more than one are listed)
  function getLatLong(address){
      var mapUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + funky.split(",")[0] + fresh.split(";")[1];
  $.ajax({
      url: mapUrl,
      method: "GET"
  }).then(function(resp){
      let latLong = resp.results[0].geometry.location
      panTo(latLong)
      })
    }

// Function: Job Query API
  function results(){
   // Search based on currently selected dropdown 
    searchInput = $("#articleCount option:selected").attr("id");
    jobUrl = "https://github-jobs-proxy.appspot.com/positions?description=" + searchInput + "&location=" //+ locationInput

  //API  Call
    $.ajax({
        url: jobUrl,
        method: "GET"
    }).then(function(resp){  

    // Save results as variable to run in Table Function
        searchResults = resp
        return searchResults;
    }).then(function(searchResults){

    //Manipulate results into the table  
      makeResultsTable(searchResults)
    })
  }

//Function: Makes the results table and displays
  function makeResultsTable (jobResponse){

  // Empties the current table
    $("#output").empty();

    //Iterate through results for the table
    for(let i = curPage; i <= curPage + 9 ; i++){

    //Make a new row for each returned result with attributes based on result information
      var newRow = $("<tr>")
      newRow.attr("id", i)
      newRow.attr("data-title", jobResponse[i].title)
      newRow.attr("data-company", jobResponse[i].company)
      newRow.attr("data-location", jobResponse[i].location)
      newRow.attr("data-description", jobResponse[i].description)
      newRow.attr("data-url", jobResponse[i].company_url)

    //Give class to specific section of the row to call the modal later
      var newTitle = $("<td>").text(jobResponse[i].title).addClass("rowtoclick")
      var newCompany = $("<td>").text(jobResponse[i].company).addClass("rowtoclick")
      var newLocation = $("<td>").text(jobResponse[i].location).addClass("rowtoclick")

    //Create a cost of living link to an external site
      var newWinLink = "https://www.numbeo.com/cost-of-living/in/" + jobResponse[i].location.split(",")[0].replace(/ /g, '-') + "?displayCurrency=USD";
      var thelink = $('<a>', {
        text: jobResponse[i].location + " CoL Info",
        title: newWinLink,
        href: "#"
      })
      newRow.attr("data-colUrl", newWinLink)

    //Append information to each row and the overall table
      var newURL = $("<td>").append(thelink).addClass("colLink")
      newRow.append(newTitle, newLocation, newCompany, newURL)
      $("#output").append(newRow)
    }
  }

//Function: Displays the next ten results of the search
  function nextPage(){
    curPage = curPage + 10
    results()
    $("#prevPage").show()
    if(curPage > 39){
      $("#nextPage").hide()
    }
  }

//Function: Displays the previous ten results of the search
  function prevPage(){
    curPage = curPage - 10
    results()
    $("#nextPage").show()
    if(curPage < 1){
      $("#prevPage").hide()
    }
  }


//============================================
//==========End of Function list==============
//============================================

// On click event to for search button to query GitHub Jobs API
  $("#searchBtn").on("click",function(){
    results()
    $("#searchResults").show();
  });

// On click event to forward to the external Cost of Living URL (Used to prevent modal loss of results)
  $(document).on("click", ".colLink", function(){

  // Opens the Cost of Living in another tab
    window.open($(this).parent().attr("data-colUrl"))
  })


// On click event for each row to create a modal with information based on results
  $(document).on("click", ".rowtoclick", function(){

  // Make a hyperlink for the company website
    var URL = $('<a>', {
      text: "Company Website",
      href: $(this).parent().attr("data-url")
    })
  // Grab the attributes of the parent row for the modal
      $("#jobTitleModal").text($(this).parent().attr("data-title"))
      $("#locationModal").text("Location: " + $(this).parent().attr("data-location"))
      $("#companyModal").text("Company: " + $(this).parent().attr("data-company"))
      $("#companyURL").html(URL)
      $("#descriptionModal").html($(this).parent().attr("data-description"))

  // Pan to the Lat/Long for Google Maps based on the location of the job
      getLatLong($(this).parent().attr("data-location"))

  // Show the modal
      $("#modal").modal("show");
  });

// On click event to display next 10 results and reset view
  $("#nextPage").on("click",function(e){
    nextPage()
    $("#searchResults").show();
    $('html, body').animate({'scrollTop':'400'});
    e.preventDefault();
  });

// On click event to display previous 10 results and reset view
  $("#prevPage").on("click",function(e){
    prevPage()
    $("#searchResults").show();
    $('html, body').animate({'scrollTop':'400'});
    e.preventDefault();
  });

});