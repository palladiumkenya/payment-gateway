import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sequelize from "./utils/database-connection";
import db from "./models/index";
import router from "./routes/transactions.route";

const app = express();
const port = 5051;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors("*"));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use('/api', router);

async function init() {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database successful.");

    // Sync models with the database
    await db.sequelize.sync({ force: false });
    console.log("Models synced with the database.");

    app.listen(port, () => {
      console.log("Server listening on port", port);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

init();
