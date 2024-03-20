var buttonColours = ["red", "blue", "green", "yellow"];
var greenNoise = new Audio("./sounds/green.mp3");
var redNoise = new Audio("./sounds/red.mp3");
var yellowNoise = new Audio("./sounds/yellow.mp3");
var blueNoise = new Audio("./sounds/blue.mp3");
var failNoise = new Audio("./sounds/wrong.mp3");

var gamePattern = [];
var userClickedPattern = [];

var gamePassed = false;

var level = 0;

//Start next pattern level
function nextSequence() {
  //increase level
  level++;

  //generate random colour and add to the pattern
  var randomNumber = Math.floor(Math.random() * 3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //play the pattern out to the user
  buttonEffect(randomChosenColour);

  //update title to tell the user the current level
  $("#level-title").text("Level " + level);
}

//when 'a' key is pressed, start the game
$(document).keydown(function (event) {
  if (event.key === "a") {
    if (level === 0) {
      nextSequence();
    }
  }
});

//when a button is clicked
$(".btn").click(function () {
  //add button colour pressed to object and players selections array
  var buttonClickOne = new ButtonClicked(this.id);
  userClickedPattern.push(buttonClickOne.userChosenColour);

  //compare players selection to the correct answer
  compareAnswers();

  //if game is passed, continue
  if (gamePassed === true) {
    //flash button player selected
    var word = "." + this.id;
    $(word).addClass("pressed");
    buttonEffect(this.id);

    setTimeout(function () {
      //after 0.1s stop selected button flash
      $(word).removeClass("pressed");

      //if full correct sequence has been selected, run next sequence after 0.5s
      if (gamePattern.length === userClickedPattern.length) {
        userClickedPattern.length = 0;

        setTimeout(function () {
          nextSequence();
        }, 500);
      }
    }, 100);
  } else {
    //else flash game over sequence and reset game
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
      level = 0;
      userClickedPattern.length = 0;
      gamePattern.length = 0;
      $("#level-title").text("GAME OVER! Press A key to start again");
      failNoise.play();
    }, 200);
  }
});

//button clicked object
function ButtonClicked(userChosenColour) {
  this.userChosenColour = userChosenColour;
}

//fade in and out button and play noise effect for specific colour
function buttonEffect(colour) {
  switch (colour) {
    case "green":
      $(".green").fadeOut(100);
      greenNoise.play();
      $(".green").fadeIn(100);
      break;

    case "blue":
      $(".blue").fadeOut(100);
      blueNoise.play();
      $(".blue").fadeIn(100);
      break;

    case "yellow":
      $(".yellow").fadeOut(100);
      yellowNoise.play();
      $(".yellow").fadeIn(100);
      break;

    case "red":
      $(".red").fadeOut(100);
      redNoise.play();
      $(".red").fadeIn(100);
      break;

    default:
      console.log("Error - colour " + colour + " is not a valid colour");
      break;
  }
}

//compare users selected answer to the correct answer
function compareAnswers() {
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (gamePattern[i] === userClickedPattern[i]) {
      gamePassed = true;
    } else {
      gamePassed = false;
      i = gamePattern.length;
    }
  }
}
