const mongoose = require("mongoose");

const createUserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    requied: true,
  },
  lastName: {
    type: String,
    requied: true,
  },
  email: {
    type: String,
    requied: true,
    unique: true,
  },
  password: {
    type: String,
    requied: true,
  },
});

const createUser = mongoose.model("createUser", createUserSchema);

module.exports = createUser;
