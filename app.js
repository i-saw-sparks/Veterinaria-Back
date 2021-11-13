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

let manageError = (res, reason, message, code) => {
    console.log("Error: " + reason);
    res.status(code || 500).json({ "error": message });
}

app.set("errManager", manageError);
require("./startup/mainRouter")(app);

var server = app.listen(process.env.PORT || LOCAL_PORT, function () {
    var port = server.address().port;
    console.log("veterinaria-back now running on port ", port);
});



