const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
  userId: {
    type: String,
    unique: true,
    required: true,
  },
});

const Sessions = mongoose.model("session", SessionSchema);

module.exports = Sessions;
