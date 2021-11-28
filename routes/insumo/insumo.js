const express = require('express');
const app = express();

app.get("/", function (req, res) {
    req.app.get("db").query('SELECT * FROM insumos_medicos', (err, rows) =>{
        if(err){
            req.app.get("errManager")(res, err.message, "Failed to get insumos medicos.");
        }else{
            res.status(200).json(rows);
        }
    })
});

app.post("/", (req, res) => {
    let data = req.body;
    if (!data.nombre) {
        res.status(400).json({ msg: "Invalid input, nombre is mandatory" });
        return;
    }
    if (!data.cantidad) {
        res.status(400).json({ msg: "Invalid input, cantidad is mandatory" });
        return;
    }
    if (!data.precio) {
        res.status(400).json({ msg: "Invalid input, precio is mandatory" });
        return;
    }
    if (!data.descripcion) {
        res.status(400).json({ msg: "Invalid input, descripcion is mandatory" });
        return;
    }
    if (!data.tipo) {
        res.status(400).json({ msg: "Invalid input, tipo is mandatory" });
        return;
    }
    if (!data.id_proveedor) {
        res.status(400).json({ msg: "Invalid input, id_proveedor is mandatory" });
        return;
    }

    req.app.get("db").query("INSERT INTO insumos_medicos " +
        "(nombre, cantidad, precio, descripcion, tipo, id_proveedor) VALUES" +
        "('" + data.nombre + "'," + data.cantidad + "," + data.precio + ",'" + data.descripcion + "','" + data.tipo + "'," + data.id_proveedor + ")"
        , (err, result) => {
            if (err) {
                req.app.get("errManager")(res, err.message, "Failed to insert insumo medico.");
            } else {
                res.status(200).json({ msg: "Insumo medico insertado con exito" });
            }
        });
})

module.exports = app;