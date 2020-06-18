const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect("mongodb+srv://admin:admin@projetos-co3nz.gcp.mongodb.net/CloneInstagram?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());

app.use("/files", express.static(path.resolve(__dirname, "..", "uploads", "resized")));

app.use(routes);

server.listen(3333);
