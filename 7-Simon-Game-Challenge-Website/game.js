var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

// Starting the game
$(document).on("keypress", function() {
    nextSequence();
    started = true;
});

// Detecting when any of the buttons are clicked
$(".btn").on("click", function() {
    userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

// Choosing random button for computer to animate
function nextSequence() {
    // Emptying the array for every time nextSequence is called
    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);

    var randomNum = Math.floor(Math.random() * 4);

    // Choosing a random color and its button
    var randomChosenColor = buttonColors[randomNum];
    var randomChosenButton = $("#" + randomChosenColor);

    // Keeping track of the colored buttons we have chosen
    gamePattern.push(randomChosenColor);

    // Animation on Button to show user it is in the pattern
    randomChosenButton.animate({opacity: "0%"}, 100);
    randomChosenButton.animate({opacity: "100%"}, 100);

    playSound(randomChosenColor);
}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

// Sound Effect
function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

// Animate a click by the user
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}