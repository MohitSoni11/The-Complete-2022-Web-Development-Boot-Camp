// Requiring Mongoose
const mongoose = require("mongoose");

// Connecting to MongoDB database
// Also creats new database called fruitsDB
mongoose.connect("mongodb://localhost:27017/fruitsDB");

// Creating blueprint for a collection structure
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

// Creating a fruit collection in the database
const Fruit = mongoose.model("Fruit", fruitSchema);

// Creating one row of data in the fruit collection
const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit."
});

// Saves the fruit row into the collection
// fruit.save();

const pineapple = new Fruit({
  name: "Pineapple",
  rating: 3,
  review: "Too sour for me."
});

// pineapple.save();

// Creating blueprint for collection structure
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,

  // Creating a relationship between the Fruit and the Person Collection
  // Now, you can include data in the fruits collection as data for the person collection
  // Notice how the pineapple in the fruits collection has the same id as the pineapple in the person collection
  favouriteFruit: fruitSchema
});

// Creating a person collection
const Person = mongoose.model("Person", personSchema);

// New row of data in person collection
const person = new Person({
  name: "Miles",
  age: 22,
  favouriteFruit: pineapple
});

// Saves the person row into the collection
// person.save();

// Finding all the names of the fruits in the Fruit collection
Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {
    // Closing the connection to the database once I'm done
    mongoose.connection.close()

    for (let i = 0; i < fruits.length; i++) {
      console.log(fruits[i].name);
    }
  }
});

// Updating a record in the Fruits collection
Fruit.updateOne({_id: "6307359f8d70ddabfd564200"}, {name: "Peach"}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully updated collection");
  }
});

// Deleting a record in the Fruits collection
Fruit.deleteOne({name: "Apple"}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully updated collection");
  }
});

Person.updateOne({name: "John"}, {favouriteFruit: fruit}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully updated collection");
  }
})

