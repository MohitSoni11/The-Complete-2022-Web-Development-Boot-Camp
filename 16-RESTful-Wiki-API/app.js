/////////////////////////////////
/**** Requiring npm Modules ****/
/////////////////////////////////

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { application } = require("express");

//////////////////////////
/**** Setting Up App ****/
//////////////////////////

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

/////////////////////////////
/**** Setting Up Server ****/
/////////////////////////////

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});

///////////////////////////////
/**** Setting Up Database ****/
///////////////////////////////

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
  title: String,
  content: String
}

const Article = mongoose.model("Article", articleSchema);

////////////////////////
/**** API Commands ****/
////////////////////////

// GET Command: Gets all articles from article collection

app.get("/articles", function(req, res) {
  Article.find({}, function(err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      res.send(err);
    }
  });
});

// POST Command: Adds article to collection

app.post("/articles", function(req, res) {
  const article = new Article({
    title: req.body.title,
    content: req.body.content
  });

  article.save(function(err) {
    if (!err) {
      res.send("Successfully added article into database.");
    } else {
      res.send(err);
    }
  });
});

// DELETE Command: Deletes all articles in the collection

app.delete("/articles", function(req, res) {
  Article.deleteMany({}, function(err) {
    if (!err) {
      res.send("Successfully deleted all articles.");
    } else {
      res.send(err);
    }
  });
});

// GET Command: Getting one specific article based on title

app.get("/articles/:title", function(req, res) {
  const requestedTitle = req.params.title;

  Article.findOne({title: requestedTitle}, function(err, doc) {
    if (doc) {
      res.send(doc);
    } else {
      res.send("No article matching that title was found.");
    }
  });
});

// PUT Command: Replacing an article with another

app.put("/articles/:title", function(req, res) {
  const requestedTitle = req.params.title;

  Article.updateOne(
    {title: requestedTitle},
    {title: req.body.title, content: req.body.content},
    {overwrite: true},
    function(err, results) {
      if (!err) {
        res.send("Successfully updated article.");
      } else {
        res.send(err);
      }
    }
  )
});

// PATCH Command: Changing one part of one article

app.patch("/articles/:title", function(req, res) {
  Article.updateOne(
    {title: req.params.title},
    {$set: req.body},
    function(err) {
      if (!err) {
        res.send("Successfully updated article.");
      } else {
        res.send(err);
      }
    }
  )
});

// DELETE Command: Delete a specific article

app.delete("/articles/:title", function(req, res) {
  Article.deleteOne({title: req.params.title}, function(err) {
    if (!err) {
      res.send("Successfully deleted the specified article.");
    } else {
      res.send(err);
    }
  });
});