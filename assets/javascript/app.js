//exercise 10 from last week -- will bring up one image for one click
//exercise 13 -- there's a for loop that will bring multiple gifs up 
//exercise 15 -- pausing of the gif 
//create an array of strings related to the topic of True Crime variable = topics
//button click that will bring up 10 static gif images 
//when the gif is clicked, it should animate
//display the rating of the gif under each gif
//Global Variables
//=================================================================================
const topics = ["Ted Bundy", "My Favorite Murder", "Narcos", "Dahmer", "Serial", "Murder", "Death", "Crime", "Cops", "SVU"];

//Global Functions
//=================================================================================

function renderButtons() {

  // Deletes the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#button-group").empty();
  // Loops through the array of movies
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generates buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var constantButton = $("<button>");
    // Adds a class of movie to our button
    constantButton.addClass("crime-topic");
    // Added a data-attribute
    constantButton.attr("data-id", topics[i]);
    // Provided the initial button text
    constantButton.text(topics[i]);
    // Added the button to the buttons-view div
    $("#button-group").append(constantButton);
  }
}

renderButtons();


$(".crime-topic").on("click", function () {

  var crimeTopic = $(this).attr("data-id");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    crimeTopic + "&api_key=xbNZfx7pTBuD31eJHsgj8RizhuNMGTGj&limit=10"; //sets the limit
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  })

    .then(function (response) {
      var results = response.data;

      console.log(response);

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var crimeImage = $("<img>");
        crimeImage.attr("src", results[i].images.fixed_height_still.url);
        crimeImage.attr("data-still", results[i].images.fixed_height_still.url);
        crimeImage.attr("data-animate", results[i].images.fixed_height.url);
        crimeImage.attr("data-state", "still");
        crimeImage.addClass("gif");

        gifDiv.prepend(p);
        gifDiv.prepend(crimeImage);

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

});

