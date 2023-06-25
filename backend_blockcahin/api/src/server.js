const express = require("express");
const cors = require("cors");
const { router } = require("./routes");

const server = express();

server.use(cors());
server.use(express.json());
server.use(router);

require("dotenv").config();

server.listen(3335, () => console.log("Servidor escutando na porta 3335"));
