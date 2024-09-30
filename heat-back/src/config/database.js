const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  // `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/menu`,
  process.env.DB_DEPLOY,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    dialectmodule: pg, //agregue esto
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  }
);

//LPMQLP
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "postgres",
//     logging: false,
//   }
// );

sequelize
  .authenticate()
  .then(() => console.log("Conexión a la base de datos PostgreSQL exitosa"))
  .catch((err) => console.error("Error conectando a la base de datos:", err));

module.exports = sequelize;
