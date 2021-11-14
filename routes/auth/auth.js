const { JWT_KEY } = require("../../keys/keys");

const express = require('express');
const app = express();

app.get("/", function (req, res) {
    var user = req.body;

    if (!user.name) {
        res.status(400).json({ msg: "Invalid input, name is mandatory" });
        return;
    }
    if (!user.password) {
        res.status(400).json({ msg: "Invalid input, password is mandatory" });
        return
    }

    //Se realizará consulta a base de datos
    data = {
        id: 1,
        nombre: "Emmanuel Garza Flores",
        horario: "9:00,15:00",
        tipo: "ADMIN",
        permisos: "ADMIN",
        contrasenia: "3746gGG8r734"
    }

    if (!data) {
        res.status(403).json({ msg: "User not found", status: 0 });
        return;
    }
    bcrypt.compare(user.password, data.password, (err, result) => {
        if (err) {
            req.app.get("errManager")(res, err.message, "Failed to auth user, internal error.");
            return;
        }
        if (result) {
            let token = jwt.sign({ name: data.nombre, id: data.id, privilege: data.permisos }, JWT_KEY);
            res.status(200).json({ msg: "Auth completed", status: 1, token: token });
            return;
        } else {
            res.status(403).json({ msg: "Auth failed", status: 0 });
            return;
        }
    })


});

module.exports = app;