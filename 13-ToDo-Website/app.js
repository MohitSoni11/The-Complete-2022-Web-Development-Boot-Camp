////////////////////////////////////////
/******* Requiring npm Packages *******/
////////////////////////////////////////

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Using own module
const date = require(__dirname + "/date.js");

//////////////////////////////
/******* Creating App *******/
//////////////////////////////

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

/////////////////////////////////////
/******* Setting up Database *******/
/////////////////////////////////////

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = {
  name: String
}

const Item = mongoose.model("Item", itemsSchema);

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

  // Getting all items from database and giving them to the ejs files
  Item.find({}, function(err, foundItems) {
    res.render("list", {listTitle: day, newListItems: foundItems});
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

/////////////////////////////////////////
/******* Receiving Post Requests *******/
/////////////////////////////////////////

app.post("/", function(req, res) {
  const newItem = req.body.newItem;

  // Adding the new item into the database
  const item = new Item({name: newItem});
  item.save();

  res.redirect("/");
});

app.post("/delete", function(req, res) {
  const checkedItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId, function(err) {
    if (err) {
      console.log(err);
    }
  });

  res.redirect("/");
});