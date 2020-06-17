var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var request = require("request");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
  return res.redirect("home")
})

app.get("/home", function(req, res){
  return res.render("home", {myuser:req.query.name})
})

app.get("/submit-form", function (req, res) {
  var api_path = "https://financialmodelingprep.com/api/v3/search?query="
  var user = ""
  var apikey ="&limit=10&exchange=NASDAQ&apikey=423feaab7fc7e04085e5962f16360aaf"

  for (const key in req.query) {
    user = req.query[key]
  }

  var url = api_path + user + apikey

  request(url, {json:true},function(err, response, body){
    if (err) {
        console.log("err")
    }
    var UserNameAndSymbol= ""
    for (const [key, value] of Object.entries(body)) {
      UserNameAndSymbol += (`${value.name} (${value.symbol}) \n`);
    }
    return res.render("search-result", {body: UserNameAndSymbol})
  })
})

app.listen(3001, function () {
  console.log("My server running")
})
module.exports = app;
