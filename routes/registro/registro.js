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

app.post("/", (req, res) => {
    let data = req.body;
    if (!data.descripcion) {
        res.status(400).json({ msg: "Invalid input, descripcion is mandatory" });
        return;
    }
    if (!data.fecha) {
        res.status(400).json({ msg: "Invalid input, fecha is mandatory" });
        return;
    }
    if (!data.id_mascota) {
        res.status(400).json({ msg: "Invalid input, id_mascota is mandatory" });
        return;
    }
    

    req.app.get("db").query("INSERT INTO registro_medico " +
        "(descripcion, fecha, id_mascota) VALUES" +
        "('" + data.descripcion + "','" + data.fecha + "'," + data.id_mascota + ")"
        , (err, result) => {
            if (err) {
                req.app.get("errManager")(res, err.message, "Failed to insert registro.");
            } else {
                res.status(200).json({ msg: "Registro insertado con exito" });
            }
        });
})

module.exports = app;