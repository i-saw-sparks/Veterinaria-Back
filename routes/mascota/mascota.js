const express = require('express');
const app = express();

app.get("/", function (req, res) {
    req.app.get("db").query('SELECT * FROM mascotas', (err, rows) =>{
        if(err){
            req.app.get("errManager")(res, err.message, "Failed to get registros medicos.");
        }else{
            res.status(200).json(rows);
        }
    })
});

module.exports = app;