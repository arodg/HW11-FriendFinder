// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Express server
const app = express();
const PORT = process.env.PORT || 3000;

// BodyParser
app.use(express.static("./app/public")); //static for public directory, images
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

// Routing
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
