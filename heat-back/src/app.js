const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

const userRouter = require("./routes/user.router");
const candidateRouter = require("./routes/candidate.router");
const responseRouter = require("./routes/response.router");
const vertexaiRouter = require("./routes/vertexai.router");

const app = express();

// // Configurar CORS para permitir solicitudes desde el frontend (puerto 3000)
// app.use(cors({
//   origin: "http://localhost:3000", // Permitir solo solicitudes desde el frontend
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// }));

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/candidates", candidateRouter);
app.use("/api/responses", responseRouter);
app.use("/api/vertexai", vertexaiRouter);

sequelize
  .sync({ alter: true, force: false })
  .then(() => {
    console.log("Modelos sincronizados con la base de datos");
  })
  .catch((err) => console.error("Error sincronizando los modelos:", err));

module.exports = app;
