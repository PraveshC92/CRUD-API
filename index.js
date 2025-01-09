const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));

const port = 8080;

require("dotenv").config();

let dataBase = null;

const mongoString = process.env.DATABASE_URL;

connectDB(mongoString);

async function connectDB() {
  if (dataBase) {
    return dataBase;
  }
  mongoose.connect(mongoString);
  dataBase = mongoose.connection;
  dataBase.on("error", (error) => {
    console.log(error);
  });

  dataBase.once("connected", () => {
    console.log("Database Connected");
  });
  return dataBase;
}

app.use(express.json());

app.use("/api", routes);

app.listen(port, () => {
  console.log(`listening on port${port}`);
});

module.exports = app;
