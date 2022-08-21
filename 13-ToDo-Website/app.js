////////////////////////////////////////
/******* Requiring npm Packages *******/
////////////////////////////////////////

const express = require("express");
const bodyParser = require("body-parser");

// Using own module
const date = require(__dirname + "/date.js");

//////////////////////////////
/******* Creating App *******/
//////////////////////////////

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const items = []; // will be useful later

/////////////////////////////////
/******* Starting Server *******/
/////////////////////////////////

app.listen(3000, function() {
  console.log("Server running on port 3000");
});

////////////////////////////////
/******* Server Routing *******/
////////////////////////////////

app.get("/", function(req, res) {
  const day = date.getDay();
  res.render("list", {listTitle: day, newListItems: items});
});

app.get("/about", function(req, res) {
  res.render("about");
});

/////////////////////////////////////////
/******* Receiving Post Requests *******/
/////////////////////////////////////////

app.post("/", function(req, res) {
  items.push(req.body.newItem);
  res.redirect("/");
});