const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });

// const DB = "mongodb+srv://bilawal:Xzc123tp@ecommerce.vifzmrh.mongodb.net/";
const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.log("Database is not connected", error);
  });
