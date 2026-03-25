const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema({
  PH: Number,
  Light: Number,
  EC: Number,
  FlowRate: Number,
  Humidity: Number,
  Temperature: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sensor", SensorSchema);