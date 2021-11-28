const express = require('express');
const app = express();

app.get("/", function (req, res) {
    req.app.get("db").query('SELECT * FROM proveedores', (err, rows) =>{
        if(err){
            req.app.get("errManager")(res, err.message, "Failed to get proveedores.");
        }else{
            res.status(200).json(rows);
        }
    })
});

module.exports = app;