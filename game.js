// Declaring an array for available colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Declaring an empty array for storing the sequence
var gamePattern = [];

// Declaring an empty array for storing the user clicks
var userClickedPattern = [];

// Variable to check if the game has stated
var started = false;

// Variable to store the level of the game
var level = 0;


// Detecting game start click
$(document).keydown(function (){

  // Checking if the game has started
  if (!started) {

    // Updating game heading
    $("#level-title").text("Level " + level);

    // Initiating game
    nextSequence();

    // Storing a boolean that the game has started
    started = true;
  }

});


// Generating and storing the color sequence
function nextSequence() {

  // Resetting the user clicked array
  userClickedPattern = [];

  // Choosing a random color
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];

  // Adding it to the array
  gamePattern.push(randomChosenColour);

  // Animation for button
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  // Sound for randomly chosen color
  playSound(randomChosenColour);

  // Updating game heading
  $("#level-title").text("Level " + level);

  // Updating the level
  level++;

}


// Detecting, handling and storing the user clicks
$(".btn").click(function () {

  // Storing the color clicked by user
  var userChosenColour = this.id;

  // Adding the color to the series
  userClickedPattern.push(userChosenColour);

  // Sound for clicked color
  playSound(userChosenColour);

  // Animation for clicked buttonColours
  animatePress(userChosenColour);

  // Passing the index of last answer to check
  checkAnswer(userClickedPattern.length - 1);

});


// Checking the answer
function checkAnswer(currentLevel) {

  // Checking the last input
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    // Checking if the pattern is completed
    if (userClickedPattern.length === gamePattern.length) {

      // Calling nextSequence() after 1000 milliseconds
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  // If the answer doesn't match
  } else {
    gameOver();
  }
}


// Game over
function gameOver() {

  // Adding "game-over" class for animation
  $("body").addClass("game-over");
  // Removing that class after 100 milliseconds
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  // Updating heading
  $("#level-title").text("Game Over, Press Any Key to Restart");

  // Restarting game
  startOver();

}


// Resetting the game
function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  level = 0;
}


// Animating user clicks
function animatePress(currentColour) {

  // Adding "pressed" class
  $("#" + currentColour).addClass("pressed");

  // Removing that class after 100 milliseconds
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}


//Playing sound for the selected color
function playSound(colorSelected) {

  switch (colorSelected) {

    case "red":
      var redAudio = new Audio("sounds/red.mp3");
      redAudio.play();
    break;

    case "blue":
      var blueAudio = new Audio("sounds/blue.mp3");
      blueAudio.play();
    break;

    case "yellow":
      var yellowAudio = new Audio("sounds/yellow.mp3");
      yellowAudio.play();
    break;

    case "green":
      var greenAudio = new Audio("sounds/green.mp3");
      greenAudio.play();
    break;

    default: alert("Error");
  }
}
