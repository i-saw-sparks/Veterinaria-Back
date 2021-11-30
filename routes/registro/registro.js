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

app.put("/", (req, res)=>{
    let body = req.body;
    req.app.get("db").query(`UPDATE registro_medico SET descripcion='${body.descripcion}', fecha='${body.fecha}' WHERE id = '${body.id}'`, (err, rows) => {
        if (err) {
            req.app.get("errManager")(res, err.message, "Failed to update registro medico.");
        } else {
            if(rows.affectedRows == 1){
                res.status(200).json({msg:"Registro medico editado con exito"});
            }else{
                res.status(400).json({msg:"Error al editar el registro medico"});
            }
        }
    })
})

app.delete("/:id", (req, res) =>{
    req.app.get("db").query('DELETE FROM registro_medico WHERE id=' + req.params.id, (err, rows) =>{
        if(err){
            req.app.get("errManager")(res, err.message, "Failed to delete registo medico.");
        }else{
            if(rows.affectedRows == 0){
                res.status(400).json({msg:"Registro medico a eliminar no encontrado"});
            }else{
                res.status(200).json({msg:"Registro medico eliminado con exito"})
            }
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