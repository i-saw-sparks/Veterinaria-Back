const express = require('express');
const app = express();

app.get("/", function (req, res) {
    req.app.get("db").query('SELECT * FROM proveedores', (err, rows) => {
        if (err) {
            req.app.get("errManager")(res, err.message, "Failed to get proveedores.");
        } else {
            res.status(200).json(rows);
        }
    })
});

app.get("/:id", (req, res) =>{
    req.app.get("db").query('SELECT * FROM proveedores WHERE id=' + req.params.id, (err, rows) =>{
        if(err){
            req.app.get("errManager")(res, err.message, "Failed to get proveedor.");
        }else{
            res.status(200).json(rows[0]);
        }
    })
})

app.put("/", (req, res)=>{
    let body = req.body;
    req.app.get("db").query(`UPDATE proveedores SET nombre='${body.nombre}', direccion='${body.direccion}', telefono='${body.telefono}', correo='${body.correo}', descripcion='${body.descripcion}' WHERE id = '${body.id}'`, (err, rows) => {
        if (err) {
            req.app.get("errManager")(res, err.message, "Failed to update proveedor.");
        } else {
            if(rows.affectedRows == 1){
                res.status(200).json({msg:"Proveedor editado con exito"});
            }else{
                res.status(400).json({msg:"Error al editar el proveedor"});
            }
        }
    })
})

app.delete("/:id", (req, res) =>{
    req.app.get("db").query('DELETE FROM proveedores WHERE id=' + req.params.id, (err, rows) =>{
        if(err){
            req.app.get("errManager")(res, err.message, "Failed to delete proveedor.");
        }else{
            if(rows.affectedRows == 0){
                res.status(400).json({msg:"Proveedor a eliminar no encontrado"});
            }else{
                res.status(200).json({msg:"Proveedor eliminado con exito"})
            }
        }
    })
})

app.post("/", (req, res) => {
    let data = req.body;
    if (!data.nombre) {
        res.status(400).json({ msg: "Invalid input, nombre is mandatory" });
        return;
    }
    if (!data.direccion) {
        res.status(400).json({ msg: "Invalid input, direccion is mandatory" });
        return;
    }
    if (!data.telefono) {
        res.status(400).json({ msg: "Invalid input, telefono is mandatory" });
        return;
    }
    if (!data.correo) {
        res.status(400).json({ msg: "Invalid input, correo is mandatory" });
        return;
    }
    if (!data.descripcion) {
        res.status(400).json({ msg: "Invalid input, descripcion is mandatory" });
        return;
    }

    req.app.get("db").query("INSERT INTO proveedores " +
        "(nombre, direccion, telefono, correo, descripcion) VALUES" +
        "('" + data.nombre + "','" + data.direccion + "','" + data.telefono + "','" + data.correo + "','" + data.descripcion + "')"
        , (err, result) => {
            if (err) {
                req.app.get("errManager")(res, err.message, "Failed to insert proveedor.");
            } else {
                res.status(200).json({ msg: "Proveedor insertado con exito" });
            }
        });
})

module.exports = app;