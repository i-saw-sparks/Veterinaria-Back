var express = require("express");
var bodyParser = require("body-parser");
//const keys = require("./keys/keys");
//const jwt = require("express-jwt");
const compression = require('compression')

var database;
var app = express();
app.use(compression())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

console.log("Loadingdummy data...");
LOCAL_PORT = 3000;

//registerRoutes();

var server = app.listen(process.env.PORT || LOCAL_PORT, function () {
    var port = server.address().port;
    console.log("veterinaria-back now running on port ", port);
});

/*
let registerRoutes = () => {
    require('./users')(app, database);
    require('./auth')(app, database);
}
*/