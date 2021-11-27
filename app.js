var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
//const keys = require("./keys/keys");
//const jwt = require("express-jwt");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "veterinaria"
});

app.use(cors({}))

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

LOCAL_PORT = 3000;

let manageError = (res, reason, message, code) => {
    console.log("Error: " + reason);
    res.status(code || 500).json({ "error": message });
}

app.set("errManager", manageError);
require("./startup/mainRouter")(app);

console.log("Connecting to the database...");
connection.connect((err) => {
    if (err) {
        console.log("Error connecting to the database");
    } else {
        console.log("Connected to the database");
        app.set("db", connection);
        var server = app.listen(process.env.PORT || LOCAL_PORT, function () {
            var port = server.address().port;
            console.log("veterinaria-back now running on port ", port);
        });

    }
});








