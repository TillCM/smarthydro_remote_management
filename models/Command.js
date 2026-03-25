const mongoose = require("mongoose");

const CommandSchema = new mongoose.Schema({
  command: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Command", CommandSchema);