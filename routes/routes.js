const express = require("express");
const router = express.Router();
const Model = require("../models/model");

//showing satus of api
router.get("/status", (request, response) => {
  const status = { status: "Running" };
  response.send(status);
});

//Post Method

router.post("/post", async (req, res) => {
  const data = new Model({
    name: req.body.name,
    age: req.body.age,
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
module.exports = router;
