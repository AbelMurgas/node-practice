const Sequelize = require("sequelize");

const sequelize = new Sequelize("tutorials", "root", "212319972006", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
