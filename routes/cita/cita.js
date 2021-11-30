const express = require('express');
const app = express();

app.get("/", (req, res) => {
    req.app.get("db").query('SELECT * FROM citas', (err, rows) => {
        if (err) {
            req.app.get("errManager")(res, err.message, "Failed to get citas.");
        } else {
            res.status(200).json(rows);
        }
    })
});

app.get("/:id", (req, res) => {
    req.app.get("db").query('SELECT * FROM citas WHERE id=' + req.params.id, (err, rows) => {
        if (err) {
            req.app.get("errManager")(res, err.message, "Failed to get cita.");
        } else {
            res.status(200).json(rows[0]);
        }
    })
})

app.put("/", (req, res)=>{
    let body = req.body;
    req.app.get("db").query(`UPDATE citas SET fecha='${body.fecha}', hora_inicio='${body.hora_inicio}', hora_fin='${body.hora_fin}', tipo='${body.tipo}' WHERE id = '${body.id}'`, (err, rows) => {
        if (err) {
            req.app.get("errManager")(res, err.message, "Failed to get cita.");
        } else {
            if(rows.affectedRows == 1){
                res.status(200).json({msg:"Cita editada con exito"});
            }else{
                res.status(400).json({msg:"Error al ediar la cita"});
            }
        }
    })
})

app.delete("/:id", (req, res) => {
    req.app.get("db").query('DELETE FROM citas WHERE id=' + req.params.id, (err, rows) => {
        if (err) {
            req.app.get("errManager")(res, err.message, "Failed to delete cita.");
        } else {
            if (rows.affectedRows == 0) {
                res.status(400).json({ msg: "Cita a eliminar no encontrada" });
            } else {
                res.status(200).json({ msg: "Cita eliminada con exito" })
            }
        }
    })
})

app.post("/", (req, res) => {
    let data = req.body;
    if (!data.fecha) {
        res.status(400).json({ msg: "Invalid input, fecha is mandatory" });
        return;
    }
    if (!data.hora_inicio) {
        res.status(400).json({ msg: "Invalid input, hora_inicio is mandatory" });
        return;
    }
    if (!data.hora_fin) {
        res.status(400).json({ msg: "Invalid input, hora_fin is mandatory" });
        return;
    }
    if (!data.tipo) {
        res.status(400).json({ msg: "Invalid input, tipo is mandatory" });
        return;
    }
    if (!data.id_usuario) {
        res.status(400).json({ msg: "Invalid input, id_usuario is mandatory" });
        return;
    }
    if (!data.id_mascota) {
        res.status(400).json({ msg: "Invalid input, id_mascota is mandatory" });
        return;
    }

    req.app.get("db").query("INSERT INTO citas " +
        "(fecha, hora_inicio, hora_fin, tipo, id_usuario, id_mascota) VALUES" +
        "('" + data.fecha + "','" + data.hora_inicio + "','" + data.hora_fin + "','" + data.tipo + "'," + data.id_usuario + "," + data.id_mascota + ")"
        , (err, result) => {
            if (err) {
                req.app.get("errManager")(res, err.message, "Failed to insert citas.");
            } else {
                res.status(200).json({ msg: "Cita insertado con exito" });
            }
        });
});

module.exports = app;