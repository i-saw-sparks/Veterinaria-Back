const { apiVersion, env } = require("../../config/configVars")

const express = require('express');
const app = express();

app.get("/", function (req, res) {
    let status = {
        version: apiVersion,
        env: env
    }
    res.status(200).json(status);
});

module.exports = app;