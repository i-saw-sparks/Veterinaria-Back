const express = require('express');
const app = express();

app.get("/", function (req, res) {
    //Consulta a base de datos
    let dummy = require("./registro_model").registroDummy;
    res.status(200).json(dummy);
});

module.exports = app;