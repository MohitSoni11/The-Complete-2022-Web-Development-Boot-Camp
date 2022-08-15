// Incorporating external npm modules
// Can see this modules in "dependencies" in package.json
var superheroes = require("superheroes");
var supervillains = require("supervillains");

console.log("Hero: ", superheroes.random());
console.log("Villain: ", supervillains.random());