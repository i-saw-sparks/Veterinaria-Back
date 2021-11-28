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