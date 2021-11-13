const express = require('express');
const app = express();

app.get("/", function (req, res) {
    //Consulta a base de datos
    let dummy = require("./usuario_model").usuariosDummy;
    res.status(200).json(dummy);
});

module.exports = app;