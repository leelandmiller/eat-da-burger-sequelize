const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const exphbs = require("express-handlebars");

let app = express();
const PORT = process.env.PORT || 8000;

// req models for syncing
const db = require('./models');

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// static content
app.use('/css', express.static(__dirname + "/node_modules/bulma/css/"));
app.use('/scripts', express.static(__dirname + "/node_modules/jquery/dist/"));

// Serve static content for the app from the "public" directory in the application directory.
app.use('/public', express.static(__dirname + "/public/css/"));

// ----- Routes ------ //
require('./routes/eat-routes')(app);
require('./routes/root-routes')(app);


db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
        console.log('listening on port ' + PORT);
    });
});
