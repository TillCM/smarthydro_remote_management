const express = require("express");
const cors = require("cors");

const connectDB = require("./db/connection");
const Sensor = require("./models/Sensor");
const Command = require("./models/Command");

const app = express();
app.use(express.json());
app.use(cors());

// 🔌 connect database
connectDB();

// ===== ROUTES =====

// 📥 Receive sensor data
app.post("/data", async (req, res) => {
  try {
    console.log("Incoming data:", req.body);

    const data = new Sensor(req.body);
    await data.save();

    res.json({ status: "saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📤 Get latest command
app.get("/command", async (req, res) => {
  const cmd = await Command.findOne().sort({ createdAt: -1 });

  res.send(cmd ? cmd.command : "");
});

// 🎮 Send command
app.post("/command", async (req, res) => {
  const { command } = req.body;

  console.log("New command:", command);

  const cmd = new Command({ command });
  await cmd.save();

  res.json({ status: "command stored" });
});

// 📊 Optional: view recent data
app.get("/data", async (req, res) => {
  const data = await Sensor.find().sort({ timestamp: -1 }).limit(10);
  res.json(data);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});