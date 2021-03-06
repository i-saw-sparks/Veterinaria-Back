const express = require('express');
const app = express();

app.get("/", function (req, res) {
    req.app.get("db").query('SELECT * FROM insumos_medicos', (err, rows) => {
        if (err) {
            req.app.get("errManager")(res, err.message, "Failed to get insumos medicos.");
        } else {
            res.status(200).json(rows);
        }
    })
});

app.get("/:id", (req, res) => {
    req.app.get("db").query('SELECT * FROM insumos_medicos WHERE id=' + req.params.id, (err, rows) => {
        if (err) {
            req.app.get("errManager")(res, err.message, "Failed to get insumos_medicos.");
        } else {
            res.status(200).json(rows[0]);
        }
    })
})

app.put("/", (req, res) => {
    let body = req.body;
    req.app.get("db").query(`UPDATE insumos_medicos SET nombre='${body.nombre}', cantidad=${body.cantidad}, precio=${body.precio}, descripcion='${body.descripcion}', tipo='${body.tipo}' WHERE id = '${body.id}'`, (err, rows) => {
        if (err) {
            req.app.get("errManager")(res, err.message, "Failed to update insumo.");
        } else {
            if (rows.affectedRows == 1) {
                res.status(200).json({ msg: "Insumo editado con exito" });
            } else {
                res.status(400).json({ msg: "Error al editar el insumo" });
            }
        }
    })
})

app.delete("/:id", (req, res) => {
    req.app.get("db").query('DELETE FROM insumos_medicos WHERE id=' + req.params.id, (err, rows) => {
        if (err) {
            req.app.get("errManager")(res, err.message, "Failed to delete insumo.");
        } else {
            if (rows.affectedRows == 0) {
                res.status(400).json({ msg: "Insumo a eliminar no encontrado" });
            } else {
                res.status(200).json({ msg: "Insumo eliminado con exito" })
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
    if (!data.cantidad) {
        res.status(400).json({ msg: "Invalid input, cantidad is mandatory" });
        return;
    }
    if (!data.precio) {
        res.status(400).json({ msg: "Invalid input, precio is mandatory" });
        return;
    }
    if (!data.descripcion) {
        res.status(400).json({ msg: "Invalid input, descripcion is mandatory" });
        return;
    }
    if (!data.tipo) {
        res.status(400).json({ msg: "Invalid input, tipo is mandatory" });
        return;
    }
    if (!data.id_proveedor) {
        res.status(400).json({ msg: "Invalid input, id_proveedor is mandatory" });
        return;
    }

    req.app.get("db").query("INSERT INTO insumos_medicos " +
        "(nombre, cantidad, precio, descripcion, tipo, id_proveedor) VALUES" +
        "('" + data.nombre + "'," + data.cantidad + "," + data.precio + ",'" + data.descripcion + "','" + data.tipo + "'," + data.id_proveedor + ")"
        , (err, result) => {
            if (err) {
                req.app.get("errManager")(res, err.message, "Failed to insert insumo medico.");
            } else {
                res.status(200).json({ msg: "Insumo medico insertado con exito" });
            }
        });
})

module.exports = app;