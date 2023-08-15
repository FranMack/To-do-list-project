const jwt = require("jsonwebtoken");
require("dotenv").config();
//const SECRET=process.env.SECRET;
const SECRET = "brancuca"; // O utiliza process.env.SECRET si lo tienes configurado en el archivo .env

const generateToken = (payload) => {
  const token = jwt.sign(payload, SECRET, { expiresIn: "24h" });
  return token;
};

function validateToken(token) {
  const payload = jwt.verify(token, SECRET);
  const user = {
    name: payload.name,
    email: payload.email,
    username: payload.username,
  };
  return user;
}

module.exports = { generateToken, validateToken };
