const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

// Use built-in express.json() and express.urlencoded() for body parsing
app.use(express.json({ limit: "256mb" }));
app.use(express.urlencoded({ limit: "256mb", extended: true }));

// Database Connection
require("./database/dbConnection");

// Config
dotenv.config({ path: "./config.env" });

// Defining Routes
app.use(require("cookie-parser")());

// Use cors middleware
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(require("./routes/route"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is connected on http://localhost:${PORT}`);
});
