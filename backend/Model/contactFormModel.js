const mongoose = require("mongoose");

const contactFormSchema = new mongoose.Schema({
    fullname: {
    type: String,
    requied: true,
  },
   email: {
    type: String,
    requied: true,
  },
  subject: {
    type: String,
    requied: true,
  },
  message: {
    type: String,
    requied: true,
  },
});

const contacForm = mongoose.model("contact", contactFormSchema);

module.exports = contacForm;
