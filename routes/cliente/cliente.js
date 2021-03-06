const express = require('express');
const app = express();

app.get("/", (req, res) => {
    req.app.get("db").query('SELECT * FROM clientes', (err, rows) => {
        if (err) {
            req.app.get("errManager")(res, err.message, "Failed to get clientes.");
        } else {
            res.status(200).json(rows);
        }
    })
});

app.get("/:id", (req, res) =>{
    req.app.get("db").query('SELECT * FROM clientes WHERE id=' + req.params.id, (err, rows) =>{
        if(err){
            req.app.get("errManager")(res, err.message, "Failed to get cliente.");
        }else{
            res.status(200).json(rows[0]);
        }
    })
})

app.put("/", (req, res)=>{
    let body = req.body;
    req.app.get("db").query(`UPDATE clientes SET nombre='${body.nombre}', telefono='${body.telefono}', direccion='${body.direccion}', email='${body.email}' WHERE id = '${body.id}'`, (err, rows) => {
        if (err) {
            req.app.get("errManager")(res, err.message, "Failed to get cliente.");
        } else {
            if(rows.affectedRows == 1){
                res.status(200).json({msg:"Cliente editado con exito"});
            }else{
                res.status(400).json({msg:"Error al editar el cliente"});
            }
        }
    })
})

app.delete("/:id", (req, res) =>{
    req.app.get("db").query('DELETE FROM clientes WHERE id=' + req.params.id, (err, rows) =>{
        if(err){
            req.app.get("errManager")(res, err.message, "Failed to delete cliente.");
        }else{
            if(rows.affectedRows == 0){
                res.status(400).json({msg:"Cliente a eliminar no encontrado"});
            }else{
                res.status(200).json({msg:"Cliente eliminado con exito"})
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
    if (!data.telefono) {
        res.status(400).json({ msg: "Invalid input, telefono is mandatory" });
        return;
    }
    if (!data.direccion) {
        res.status(400).json({ msg: "Invalid input, direccion is mandatory" });
        return;
    }
    if (!data.email) {
        res.status(400).json({ msg: "Invalid input, email is mandatory" });
        return;
    }

    req.app.get("db").query("INSERT INTO clientes " +
        "(nombre, telefono, direccion, email) VALUES" +
        "('" + data.nombre + "','" + data.telefono + "','" + data.direccion + "','" + data.email + "')"
        , (err, result) => {
            if (err) {
                req.app.get("errManager")(res, err.message, "Failed to insert cliente.");
            } else {
                res.status(200).json({ msg: "Cliente insertado con exito" });
            }
        });
});


module.exports = app;