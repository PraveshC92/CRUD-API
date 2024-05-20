const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");

const app = express();
const port = 8080;

require("dotenv").config();

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const dataBase = mongoose.connection;

dataBase.on("error", (error) => {
  console.log(error);
});

dataBase.once("connected", () => {
  console.log("Database Connected");
});

app.use(express.json());

app.use("/api", routes);

app.listen(port, () => {
  console.log(`listening on port${port}`);
});
