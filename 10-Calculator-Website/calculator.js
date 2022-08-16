const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

// Creating server
app.listen(3000, function() {
    console.log("Server Started");
});

// Root Page Calculator

// Creating root route and sending html file
app.get("/", function(req, res) {
    // dirname allows you to send the file to the server even if the website
    // is on the cloud or on someone else's computer
    res.sendFile(__dirname + "/index.html");
});

// Handeling any post requests that come to our server
app.post("/", function(req, res) {
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var result = num1 + num2;

    res.send("The result of the calculation is " + result);
});

// BMI Calculator

// Creating route
app.get("/bmicalculator", function(req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

// What server should do and send back when post request
// is sent by browser to the route
app.post("/bmicalculator", function(req, res) {
    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);
    var bmi = weight / (height * height);
    res.send("Your BMI is " + bmi);
});