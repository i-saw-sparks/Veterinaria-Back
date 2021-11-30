const express = require('express');
const app = express();

app.get("/", function (req, res) {
    req.app.get("db").query('SELECT * FROM mascotas', (err, rows) => {
        if (err) {
            req.app.get("errManager")(res, err.message, "Failed to get registros medicos.");
        } else {
            res.status(200).json(rows);
        }
    })
});

app.get("/:id", (req, res) =>{
    req.app.get("db").query('SELECT * FROM mascotas WHERE id=' + req.params.id, (err, rows) =>{
        if(err){
            req.app.get("errManager")(res, err.message, "Failed to get mascotas.");
        }else{
            res.status(200).json(rows[0]);
        }
    })
})

app.delete("/:id", (req, res) =>{
    req.app.get("db").query('DELETE FROM mascotas WHERE id=' + req.params.id, (err, rows) =>{
        if(err){
            req.app.get("errManager")(res, err.message, "Failed to delete mascota.");
        }else{
            if(rows.affectedRows == 0){
                res.status(400).json({msg:"Mascota a eliminar no encontrado"});
            }else{
                res.status(200).json({msg:"Mascota eliminado con exito"})
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
    if (!data.fecha_nacimiento) {
        res.status(400).json({ msg: "Invalid input, fecha_nacimiento is mandatory" });
        return;
    }
    if (!data.especie) {
        res.status(400).json({ msg: "Invalid input, especie is mandatory" });
        return;
    }
    if (!data.id_cliente) {
        res.status(400).json({ msg: "Invalid input, id_cliente is mandatory" });
        return;
    }

    req.app.get("db").query("INSERT INTO mascotas " +
        "(nombre, fecha_nacimiento, especie, id_cliente) VALUES" +
        "('" + data.nombre + "','" + data.fecha_nacimiento + "','" + data.especie + "'," + data.id_cliente + ")"
        , (err, result) => {
            if (err) {
                req.app.get("errManager")(res, err.message, "Failed to insert mascota.");
            } else {
                res.status(200).json({ msg: "Mascota insertada con exito" });
            }
        });
})

module.exports = app;