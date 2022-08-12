// Adding multiple classes
$("h1").addClass("huge-title margin-50");

// Changes all the buttons on the page
// Like innerHTML in JavaScript
$("button").html("<em>Don't Click Me</em>")

// Accessing and Setting attributes
$("a").attr("href", "https://bing.com")
$("a").html("Bing")

// Adding event listeners
$("h1").on("click", function() {
    $("h1").removeClass("huge-title");
});

// Adding several event listeners without a for loop
// JQuery selects all buttons, not just 1
$("button").on("click", function() {
    $("h1").addClass("huge-title")
});

// Detecting key-presses
$(document).on("keypress", function(event) {
    var key = event.key;
    $("h1").text(key);
});

// Adding elements without touching html
$("h1").before("<button class='new_button'>Button</button>");

// Simple animations
$(".new_button").on("click", function() {
    $("h1").slideToggle();
});

// You can use .animate() to tell JQuery that you want to animate until that happens
// You can also chain together animations
$(".new_button").after("<button class='new_button2'>Another Button</button>")
$(".new_button2").on("click", function() {
    // Can only use numeric attributes
    $("h1").slideUp().slideDown().animate({opacity: 0.5});
});