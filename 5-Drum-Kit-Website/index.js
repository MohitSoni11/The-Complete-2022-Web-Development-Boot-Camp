// Detecting Button Press

for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        var buttonInnerHTML = this.innerHTML;

        makeSound(buttonInnerHTML);
        buttonAnimation(buttonInnerHTML);        
    });   
}

document.addEventListener("keydown", function(event) {
    makeSound(event.key);
    buttonAnimation(event.key);
});

// Detecting Keyboard press

function makeSound(key) {
    if (key === "w") {
        var audio = new Audio("sounds/crash.mp3")
        audio.play();
    } else if (key === "a") {
        var audio = new Audio("sounds/kick-bass.mp3")
        audio.play();
    } else if (key === "s") {
        var audio = new Audio("sounds/snare.mp3")
        audio.play();
    } else if (key === "d") {
        var audio = new Audio("sounds/tom-1.mp3")
        audio.play();
    } else if (key === "j") {
        var audio = new Audio("sounds/tom-2.mp3")
        audio.play();
    } else if (key === "k") {
        var audio = new Audio("sounds/tom-3.mp3")
        audio.play();
    } else {
        var audio = new Audio("sounds/tom-4.mp3")
        audio.play();
    }
}

// Creating an animation for the button when it is pressed

function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("." + currentKey);
    activeButton.classList.add("pressed");
    setTimeout(function() {
        activeButton.classList.remove("pressed");
    }, 100);
}