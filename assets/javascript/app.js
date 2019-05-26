//Global Variables
//=================================================================================
const topics = ["Train", "Hawaii", "Iceland", "Germany", "Britain", "New York City", "California", "Airplane", "New Zealand", "Luggage"];

//Global Functions
//=================================================================================

function renderButtons() {

  $("#button-group").empty();

  for (var i = 0; i < topics.length; i++) {
    var constantButton = $("<button>");
    
    constantButton.addClass("travel-topic");
    constantButton.attr("data-id", topics[i]);
    constantButton.text(topics[i]);

    $("#button-group").append(constantButton);
  }
}


function displayTravelGifs() {

  $("#gif-zone").empty();

  var travelTopic = $(this).attr("data-id");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    travelTopic + "&api_key=xbNZfx7pTBuD31eJHsgj8RizhuNMGTGj&limit=10"; //sets the limit
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  })

    .then(function (response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var travelImage = $("<img>");
        travelImage.attr("src", results[i].images.fixed_height_still.url);
        travelImage.attr("data-still", results[i].images.fixed_height_still.url);
        travelImage.attr("data-animate", results[i].images.fixed_height.url);
        travelImage.attr("data-state", "still");
        travelImage.addClass("gif img-fluid");
  
        gifDiv.prepend(p);
        gifDiv.prepend(travelImage);

        $("#gif-zone").prepend(gifDiv);

      }

      $(".gif").on("click", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });
}


$("#add-topic").on("click", function(event) {
  event.preventDefault();

  var userTopic = $("#user-topic").val().trim();

  topics.push(userTopic);

  renderButtons();

  $("#user-topic").val("");
});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".travel-topic", displayTravelGifs);

renderButtons();