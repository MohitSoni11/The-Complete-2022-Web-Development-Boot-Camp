/******************* Changing the Dice Image *******************/

var randomNumber1 = Math.ceil(Math.random() * 6)
var imgPath1 = "images/dice" + randomNumber1 + ".png"

// Changing the left dice image based on the random number
document.querySelector(".img1").setAttribute("src", imgPath1);

var randomNumber2 = Math.ceil(Math.random() * 6)
var imgPath2 = "images/dice" + randomNumber2 + ".png"

// Changing the right dice image based on the second random number
document.querySelector(".img2").setAttribute("src", imgPath2);

/**************** Changing Text Based on Winner ****************/

if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").innerHTML = "<i class='fa-solid fa-flag'></i> Player 1 Wins!";
} else if (randomNumber1 < randomNumber2) {
    document.querySelector("h1").innerHTML = "Player 2 Wins! <i class='fa-solid fa-flag'></i>";
} else {
    document.querySelector("h1").innerHTML = "Draw!";
}