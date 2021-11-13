module.exports = function (app) {

    
    //var authRoute = require("../routes/auth/auth");
    var citaRoute = require("../routes/cita/cita");
    var clienteRoute = require("../routes/cliente/cliente");
    var insumoRoute = require("../routes/insumo/insumo");
    var mascotaRoute = require("../routes/mascota/mascota");
    var productoRoute = require("../routes/producto/producto");
    var proveedorRoute = require("../routes/proveedor/proveedor");
  
    var registroRoutes = require("../routes/registro/registro");
    var statusRoute = require("../routes/status/status");
    var usuarioRoute = require("../routes/usuario/usuario");
    
    //app.use("/api/auth", authRoute);
    app.use("/api/cita", citaRoute);
    app.use("/api/cliente", clienteRoute);
    app.use("/api/insumo", insumoRoute);
    app.use("/api/mascota", mascotaRoute);
    app.use("/api/producto", productoRoute);
    app.use("/api/proveedor", proveedorRoute);
    app.use("/api/registro", registroRoutes);
    app.use("/api/status", statusRoute);
    app.use("/api/usuario", usuarioRoute);
  };