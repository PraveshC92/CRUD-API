const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  userName: {
    required: true,
    type: String,
  },
  userPhone: {
    required: true,
    type: Number,
  },
  userAge: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Data", dataSchema);
