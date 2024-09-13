const app = require("./src/app"); // Importar app.js desde src
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
