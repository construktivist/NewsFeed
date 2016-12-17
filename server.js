var express = require("express");
var path = require('path');
var bodyParser = require("body-parser");
var logger = require("morgan");
var methodOverride = require('method-override');
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var Promise = require("bluebird");
var scrape_controller = require("./controllers/scrape_controller.js")
//var Scrape = require("./models/Scrape.js");
var Article = require("./models/Articles.js");

mongoose.Promise = Promise;


var app = express();

app.use(methodOverride('_method'))

app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.static("public"));
app.set('views', path.join(__dirname, 'views'));

var exphbs = require('express-handlebars');
app.engine('hbs', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

mongoose.connect("mongodb://localhost/newsfeed_db");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.use("/", scrape_controller);

app.use(function(request, result, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, request, result, next) {
  result.status(err.status || 500);
  result.render('error', {
    message: err.message,
    err: (app.get('env') === 'development') ? err : {}
  })
});

app.listen(3000, function() {
  console.log("App running on port 3000!");
});