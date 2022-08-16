const express = require("express");
const app = express();

// Started a server
// The server is listening on port 3000 to check if a brower wants
// anything from it

// By putting localhost:3000 in the browser, the browser now knows
// the "location" of the server and sends it a get request
// to get data to display

// Running just this will give you an error because the browser will
// try to get in touch with the server but the server didn't 
// give the browser anything to display
app.listen(3000, function() {
    console.log("Server started on port 3000");
});

// This command below tells the server what it should send back
// when a browser sends a get request to the server

// The first parameter tells the server that we are giving you info
// that should be displayed when the browser wants to see the homepage
// NOTE: "/" means homepage

// The call back function tells the server what to do when the request
// is triggered by the browser

// Req is the request the browser made to the server
// Res is the response the server gave to the browser
app.get("/", function(req, res) {
    res.send("<h1>Hello</h1>");
});

// This changes the route which the server is looking for
// Before, the "/" meant homepage (or the root route) but
// we have changed that to /contact
// So, if we go to localhost:3000/contact, then you see
// whatever the res is sending

app.get("/contact", function(req, res) {
    res.send("Contact me at: mohitksoni@outlook.com");
});

// Creating a new route for the about page
app.get("/about", function(req, res) {
    res.send("Bio: I really like Cricket, ML, and CS.")
});

// Creating another route for the hobbies page
app.get("/hobbies", function(req, res) {
    res.send("Hobbies: Cricket, Drums, Coding");
});