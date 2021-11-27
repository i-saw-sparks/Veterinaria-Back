module.exports = function (app) {
    var authRoute = require("../routes/auth/auth");
    var citaRoute = require("../routes/cita/cita");
    var clienteRoute = require("../routes/cliente/cliente");
    var insumoRoute = require("../routes/insumo/insumo");
    var mascotaRoute = require("../routes/mascota/mascota");
    var productoRoute = require("../routes/producto/producto");
    var proveedorRoute = require("../routes/proveedor/proveedor");
  
    var registroRoutes = require("../routes/registro/registro");
    var statusRoute = require("../routes/status/status");
    var usuarioRoute = require("../routes/usuario/usuario");
    
    app.use("/apiOs/auth", authRoute);
    app.use("/apiOs/cita", citaRoute);
    app.use("/apiOs/cliente", clienteRoute);
    app.use("/apiOs/insumo", insumoRoute);
    app.use("/apiOs/mascota", mascotaRoute);
    app.use("/apiOs/producto", productoRoute);
    app.use("/apiOs/proveedor", proveedorRoute);
    app.use("/apiOs/registro", registroRoutes);
    app.use("/apiOs/status", statusRoute);
    app.use("/apiOs/usuario", usuarioRoute);
  };