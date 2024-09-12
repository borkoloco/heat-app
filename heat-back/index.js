const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

// Ruta de ejemplo para manejar un POST
app.post("/datos", (req, res) => {
  const datos = req.body;
  res.send(`Datos recibidos: ${JSON.stringify(datos)}`);
});

// Levantar el servidor
app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
