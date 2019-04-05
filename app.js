var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var request = require("request");
var app = express();

mongoose.connect("mongodb://localhost/wikipedia", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");


// https://en.wikipedia.org/w/api.php?action=opensearch&search=Albert%20Einstein&limit=10&namespace=0&format=json

// https://en.wikipedia.org/api/rest_v1/page/summary/Stack_Overflow
app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/results", function(req, res) {
    var query = req.query.search;
    request(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&utf8=&format=json`, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            // var results = JSON.parse(body);
            // res.send(results);
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
    });
});
// http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvsection=0&titles=pizza
// http://omdbapi.com/?s=california&apikey=thewdb

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Wiki search has started");
});
