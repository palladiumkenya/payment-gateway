import sequelize from "../utils/database-connection";
import { Sequelize } from "sequelize";
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.MpesaPayload = import("./mpesa-payload.model");

export default db;
