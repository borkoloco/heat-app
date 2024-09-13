const express = require("express");
require("dotenv").config(); // Para cargar las variables de entorno
const app = express();
const sequelize = require("./config/database");

// Middlewares
app.use(express.json()); // Middleware para parsear JSON

// Importar las rutas
const candidateRouter = require("./routes/candidate.router");
// const userRouter = require("./routes/user.router");
// const responseRouter = require("./routes/response.router");

// Usar las rutas
app.use("/api/candidates", candidateRouter);
// app.use("/api/users", userRouter);
// app.use("/api/responses", responseRouter);

// Ruta principal de ejemplo
app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

// Sincronizar los modelos con la base de datos
sequelize
  .sync({ force: false }) // `force: true` reinicia las tablas en cada ejecución (útil en desarrollo)
  .then(() => {
    console.log("Modelos sincronizados con la base de datos");
  })
  .catch((err) => console.error("Error sincronizando los modelos:", err));

// Exportar la app para que sea usada en index.js
module.exports = app;
