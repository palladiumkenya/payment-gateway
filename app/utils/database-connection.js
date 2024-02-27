import { Sequelize } from "sequelize";

const sequelize = new Sequelize("payment_gateway", "root", "jess#2020", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
