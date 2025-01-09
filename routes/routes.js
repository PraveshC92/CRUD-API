const express = require("express");
const router = express.Router();
const Model = require("../models/model");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//showing satus of api
router.get("/status", (request, response) => {
  const status = { status: "Running" };
  response.send(status);
});

//Post Method

router.post("/post", async (req, res) => {
  const data = new Model({
    userName: req.body.userName,
    userPhone: req.body.userPhone,
    userAge: req.body.userAge,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Get All Method

router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: `${err.message}` });
  }
});

//get by id api

router.get("/get/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
});

//update by id method
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const option = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, option);
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
});

//delete by id method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//login using jwt
router.get("/getUserLogin", (req, res) => {
  res.json({ message: "welcome to user login API " });
});

router.post("/posts", verifyToken, async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      await mongoose.connection.db.collection("user").insertOne(authData.user);
      res.json({
        message: "user post created",
        authData,
      });
    }
  });
});

router.post("/userRegisteration", async (req, res) => {
  const user = {
    id: req.body.id,
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
  };
  require("dotenv").config;

  jwt.sign({ user: user }, "secretkey", { expiresIn: "1m" }, (err, token) => {
    res.json({
      token,
    });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader && typeof bearerHeader !== "unefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
router.use(express.json());
module.exports = router;
