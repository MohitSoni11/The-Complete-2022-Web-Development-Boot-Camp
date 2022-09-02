/////////////////////////////////////
/****** Requiring npm Modules ******/
/////////////////////////////////////

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const md5 = require("md5");

////////////////////////////////
/****** Creating the App ******/
////////////////////////////////

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//////////////////////////////////
/****** Starting the Server******/
//////////////////////////////////

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});

///////////////////////////////////
/****** Setting up Database ******/
///////////////////////////////////

mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

// Encryption of password in userSchema
// Whenever you save a doc in a collection, mongoose will encrypt
// Whenever you want to find a doc, mongoose will decrypt
/* userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ["password"]}); */

const User = new mongoose.model("User", userSchema);

//////////////////////////////////////
/****** Handeling GET Requests ******/
//////////////////////////////////////

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/register", function(req, res) {
  res.render("register");
});

///////////////////////////////////////
/****** Handeling POST Requests ******/
///////////////////////////////////////

app.post("/register", function(req, res) {
  const newUser = new User({
    email: req.body.username,

    // Hashing the password
    password: md5(req.body.password)
  });

  newUser.save(function(err) {
    if (!err) {
      res.render("secrets");
    } else {
      res.send(err);
    }
  })
});

app.post("/login", function(req, res) {
  const username = req.body.username;

  // Hashing the password
  const password = md5(req.body.password);

  User.findOne({email: username}, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else if (foundUser && foundUser.password === password) {
      res.render("secrets");
    } else {
      res.send("Username or Password is incorrect.")
    }
  });
});