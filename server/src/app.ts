import express, { urlencoded } from "express";
import sequelize from "./configs/db.config";

import Router from "./router";

import bodyParser from "body-parser";
import cors from "cors";
import createTable from "./models";
const app = express();

app.use(urlencoded());
app.use(cors());
app.use(bodyParser.json());

sequelize.authenticate();
createTable();

Router(app);

app.listen(8000, () => {
  console.log("http://localhost:8000");
});
