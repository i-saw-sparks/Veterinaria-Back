const express = require('express');
const app = express();

app.get("/",  (req, res) => {
    req.app.get("db").query('SELECT * FROM usuarios', (err, rows, fields) =>{
        if(err){
            req.app.get("errManager")(res, err.message, "Failed to get users.");
        }else{
            res.status(200).json(rows);
        }
    })
});

app.post("/", (req, res) => {
    let data = req.body;

    //Agregar hasheo de contraseña

    req.app.get("db").query("INSERT INTO usuarios " +
    "(nombre, contrasenia, horario, tipo_usuario, permisos) VALUES" +
    "('"+data.nombre+"','"+data.contrasenia+"','"+data.horario+"',"+data.tipo_usuario+",'"+data.permisos+"')"
    , (err, result) =>{
        if(err){
            req.app.get("errManager")(res, err.message, "Failed to insert user.");
        }else{
            console.log(result);
            res.status(200).send();
        }
    });

})

module.exports = app;