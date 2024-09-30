const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const { User, Candidate, Response } = require("./config/associations");

const userRouter = require("./routes/user.router");
const candidateRouter = require("./routes/candidate.router");
const responseRouter = require("./routes/response.router");
const aiRouter = require("./routes/ai.router");

const app = express();

const corsOptions = {
  origin: "https://heat-app.vercel.app",
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/candidates", candidateRouter);
app.use("/api/responses", responseRouter);
app.use("/api/ai", aiRouter);

sequelize
  .sync({ alter: true, force: false })
  .then(() => {
    console.log("Modelos sincronizados con la base de datos");
  })
  .catch((err) => console.error("Error sincronizando los modelos:", err));

module.exports = app;
