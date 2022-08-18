const express = require("express");
const bodyParser = require("body-parser");

// native node module so no need to install using npm
const https = require("https");
const { resolveNaptr } = require("dns");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.listen(3000, function() {
    console.log("Server has started on port 3000");
    console.log("Navigate to localhost:3000 to send get request to server");
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const userCity = req.body.cityName;

    // Using the Weather API to get data based on user input
    url = "https://api.openweathermap.org/data/2.5/weather?appid=f737214bec3490549f9dd716dc01afcb&units=imperial&q=" + userCity;
    https.get(url, function(response) {
        // Converting the data I got to JSON format
        // Storing the JSON as a javascript object
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const descr = weatherData.weather[0].description;
            const imgURL = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
            res.write("<h1>" + userCity + "</h1>");
            res.write("<hr>");
            res.write("Temperature: " + temp + " degrees Fahrenheit<br>");
            res.write("Weather Description: " + descr);
            res.write("<br><img src=" + imgURL + ">");
            res.send();
        });
    });
});