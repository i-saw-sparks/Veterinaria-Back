const express = require('express');
const app = express();

app.get("/", (req, res) => {
    req.app.get("db").query('SELECT * FROM registro_medico', (err, rows) =>{
        if(err){
            req.app.get("errManager")(res, err.message, "Failed to get registros medicos.");
        }else{
            res.status(200).json(rows);
        }
    })
});

app.get("/:id_mascota", (req, res) =>{
    req.app.get("db").query('SELECT * FROM registro_medico WHERE id_mascota=' + req.params.id_mascota, (err, rows) =>{
        if(err){
            req.app.get("errManager")(res, err.message, "Failed to get registros medicos.");
        }else{
            res.status(200).json(rows);
        }
    })
})

module.exports = app;