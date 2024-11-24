const { Sequelize } = require("sequelize");
const seq = new Sequelize("nodejsdb", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

module.exports =seq
