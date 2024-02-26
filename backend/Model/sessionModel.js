const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,  // Token should be unique
    required: true,  // Token is required
  },
  userId: {
    type: String,
    unique: true,  // userId should be unique
    required: true,  // userId is required
  },
});

const Sessions = mongoose.model("session", SessionSchema);

module.exports = Sessions;