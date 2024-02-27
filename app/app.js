import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 5051;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors("*"));

app.get('/', (req, res) => {
    res.send('hello world')
  })

app.listen(port, () => {
  console.log("Server listening on port", port);
});
