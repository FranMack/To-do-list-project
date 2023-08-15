const express = require("express");
const morgan = require("morgan");
const app = express();
const routes = require("./routes/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const db = require("./config/db");

const { Users, Activities } = require("./models/index");
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // URL del frontend
    credentials: true, // Habilita el envio de cookies
  })
);
app.use(cookieParser());
app.use(morgan("tiny"));
app.use("/api", routes);

const PORT = process.env.PORT || 5000;

db.sync({ force: false })
  .then(() => app.listen(PORT, () => console.log(`Listening on ${PORT}`)))
  .catch((error) => {
    console.log(error);
  });
