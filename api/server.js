const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const wordsRoutes = require("../words/wordsRoutes");

const JSON_SIZE_LIMIT = "5mb";

const server = express();

server.use(bodyParser.json({ limit: JSON_SIZE_LIMIT }));
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up", timestamp: Date.now() });
});

server.use("/api/words", wordsRoutes);

module.exports = server;
