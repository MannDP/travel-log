const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const middlewares = require('./middlewares.js');
const mongoose = require('mongoose');
const logs = require('./api/logs.js');
require('dotenv').config();

const app = express();
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(morgan("common"));
app.use(express.json());

app.get("/", (req, res) =>
  res.json({
    message: "Hello World!",
  })
);

app.use('/api/logs', logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
