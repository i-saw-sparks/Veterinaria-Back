const { JWT_KEY } = require("../../keys/keys");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const express = require('express');
const app = express();

app.post("/", function (req, res) {
    var data = req.body;

    if (!data.nombre) {
        res.status(400).json({ msg: "Invalid input, nombre is mandatory" });
        return;
    }
    if (!data.contrasenia) {
        res.status(400).json({ msg: "Invalid input, contrasenia is mandatory" });
        return
    }

    req.app.get("db").query("SELECT * FROM usuarios WHERE nombre = '" + data.nombre + "'", (err, rows) => {
        if (rows.length == 0) {
            res.status(403).json({ msg: "User not found", status: 0 });
            return;
        }
        //console.log(rows[0].contrasenia);
        bcrypt.compare(data.contrasenia, rows[0].contrasenia, (err, result) => {
            if (err) {
                req.app.get("errManager")(res, err.message, "Failed to auth user, internal error.");
                return;
            }
            if (result) {
                let token = jwt.sign({ id: data.id, permisos: data.permisos, tipo_usuario: data.tipo_usuario }, JWT_KEY);
                res.status(200).json({ msg: "Auth completed", token: token });
                return;
            } else {
                res.status(403).json({ msg: "Auth failed", status: 0 });
                return;
            }
        })
    })

});

module.exports = app;