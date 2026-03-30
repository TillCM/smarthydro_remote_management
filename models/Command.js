const mongoose = require("mongoose");

const CommandSchema = new mongoose.Schema({
  command: String,

  executed: {              // 👈 ADD THIS
    type: Boolean,
    default: false
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Command", CommandSchema);