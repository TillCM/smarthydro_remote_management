const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema({

  // Identifies which physical tent this reading came from. Must match the
  // LOCATION_ID slug baked into that tent's ESP32 firmware (esp32_config.h).
  // Required: previously all three deployed tents wrote into this same
  // collection with no way to tell their data apart, so a reading can no
  // longer be stored without knowing which tent it belongs to.
  locationId: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,        // normalises casing - "Durban_North" and "durban_north"
    index: true             // this collection is now routinely filtered by
                            // locationId (GET /data?locationId=...); without an
                            // index that's a full collection scan every time
  },


  PH: Number,
  Light: Number,
  EC: Number,
  FlowRate: Number,
  Humidity: Number,
  Temperature: Number,
  timestamp: { type: Date, default: Date.now }
});

// Compound index for the actual query shape used in GET /data: "most
// recent readings for this one location". This serves that query
// directly, rather than relying on the single-field index above plus an
// in-memory sort across a growing multi-tent collection.
SensorSchema.index({ locationId: 1, timestamp: -1 });

module.exports = mongoose.model("Sensor", SensorSchema);