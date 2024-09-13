const { Sequelize } = require("sequelize");

// Configura la conexión a PostgreSQL usando variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres", // PostgreSQL
    logging: false, // Desactiva el log de consultas SQL
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Conexión a la base de datos PostgreSQL exitosa"))
  .catch((err) => console.error("Error conectando a la base de datos:", err));

module.exports = sequelize;
