const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

// Allows server to display static files like the images and css files we have stored
// The parameter public tells the server that everthing inside the public folder is static
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true})); 

// The first part if there so we can deploy the website using Heroku
app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000");
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email, 
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName, 
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/80c39ddd7f";
    const options = {
        method: "POST",
        auth: "mohit:f830b04ee52352012b3cace65ceeb53c-us14"
    };


    const request = https.request(url, options, function(response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
    });

    request.write(jsonData);
    request.end();
})

app.post("/failure", function(req, res) {
    res.redirect("/");
});