const express = require("express");
const router = express.Router();
const Participant = require("../models/Participant");

// 🔹 GET all participants
router.get("/", async (req, res) => {
  try {
    const participants = await Participant.find().sort({ registeredAt: -1 });
    res.json(participants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 POST new participant
router.post("/", async (req, res) => {
  console.log("POST body:", req.body); // ✅ This is valid here

  const { fullName, email, age } = req.body;

  const newParticipant = new Participant({ fullName, email, age });

  try {
    const saved = await newParticipant.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🔹 PUT (update) participant
router.put("/:id", async (req, res) => {
  const { fullName, email, age } = req.body;

  try {
    const updated = await Participant.findByIdAndUpdate(
      req.params.id,
      { fullName, email, age },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🔹 DELETE participant
router.delete("/:id", async (req, res) => {
  try {
    await Participant.findByIdAndDelete(req.params.id);
    res.json({ message: "Participant deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
