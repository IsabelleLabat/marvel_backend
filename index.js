const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const comicsRoutes = require("./routes/comics");
const charactersRoutes = require("./routes/characters");

app.use(comicsRoutes);
app.use(charactersRoutes);

app.get("/", (req, res) => {
  res.json("Bienvenue sur l'API de Marvel");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
