const fs = require("fs");
const path = require("path");

// Retrieve the content of the secret from the environment variable
const googleCredentials = process.env.GOOGLE_CREDENTIALS;

if (googleCredentials) {
  // Define the path where the JSON file will be written (inside the Fly.io instance)
  const credentialsPath = path.join(__dirname, "foodexpress.json");

  // Write the content to a JSON file
  fs.writeFileSync(credentialsPath, googleCredentials);

  // Update the GOOGLE_APPLICATION_CREDENTIALS environment variable to point to the new file
  process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;

  console.log("Google credentials JSON file created at:", credentialsPath);
} else {
  console.error("GOOGLE_CREDENTIALS environment variable is missing.");
}

const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const { User, Candidate, Response } = require("./config/associations");

const userRouter = require("./routes/user.router");
const candidateRouter = require("./routes/candidate.router");
const responseRouter = require("./routes/response.router");
const aiRouter = require("./routes/ai.router");

const app = express();

app.use(cors());
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
