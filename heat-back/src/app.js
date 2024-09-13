const express = require("express");
require("dotenv").config();
const app = express();
const sequelize = require("./config/database");

app.use(express.json());

const candidateRouter = require("./routes/candidate.router");
const userRouter = require("./routes/user.router");
const responseRouter = require("./routes/response.router");

app.use("/api/candidates", candidateRouter);
app.use("/api/users", userRouter);
app.use("/api/responses", responseRouter);

// Ruta principal de ejemplo
app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Modelos sincronizados con la base de datos");
  })
  .catch((err) => console.error("Error sincronizando los modelos:", err));

module.exports = app;
