const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json({ limit: '256mb' }));
app.use(bodyParser.urlencoded({ limit: '256mb', extended: true }));

//database Connection
require("./database/dbConnection")

// Config
dotenv.config({ path: './config.env' });

//defing Routes
app.use(cors());
app.use(express.json());
app.use(require("./routes/route"))

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is connected on http://localhost:${PORT}`);
});