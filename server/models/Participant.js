const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Participant", ParticipantSchema);
