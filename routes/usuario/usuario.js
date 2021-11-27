const express = require('express');
const app = express();
const bcrypt = require("bcryptjs");

app.get("/",  (req, res) => {
    req.app.get("db").query('SELECT * FROM usuarios', (err, rows) =>{
        if(err){
            req.app.get("errManager")(res, err.message, "Failed to get users.");
        }else{
            res.status(200).json(rows);
        }
    })
});

app.post("/", (req, res) => {
    let data = req.body;

    req.app.get("db").query("SELECT * FROM usuarios WHERE nombre = '" + data.nombre + "'", (err, rows) =>{
        if(err){
            req.app.get("errManager")(res, err.message, "Failed to post user."); 
        }else{
            if(rows.length != 0){
                res.status(400).json({msg:"Este usuario ya existe"});
            }else{
                data.contrasenia = bcrypt.hashSync(data.contrasenia, bcrypt.genSaltSync(10));

                req.app.get("db").query("INSERT INTO usuarios " +
                "(nombre, contrasenia, horario, tipo_usuario, permisos) VALUES" +
                "('"+data.nombre+"','"+data.contrasenia+"','"+data.horario+"',"+data.tipo_usuario+",'"+data.permisos+"')"
                , (err, result) =>{
                    if(err){
                        req.app.get("errManager")(res, err.message, "Failed to insert user.");
                    }else{
                        console.log(result);
                        res.status(200).json({msg:"Usuario insertado con exito"});
                    }
                });
            }
        }
    } )

})

module.exports = app;