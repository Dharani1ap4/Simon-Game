var buttonColours = ["red", "blue", "yellow", "green"];


var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#titlename").text("level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("wrong");
        playSound("wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#titlename").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function nextSequence() {
    userClickedPattern = [];

    level++;

    $("#titlename").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name) {
    var soundWhileClicked = new Audio("sounds/" + name + ".mp3");
    soundWhileClicked.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;

}