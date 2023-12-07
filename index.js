const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

mongoose.connect("mongodb://localhost:27017/marvel");

const comicsRoutes = require("./routes/comics");
const charactersRoutes = require("./routes/characters");
const UserRoutes = require("./routes/user");
const FavoritesRoutes = require("./routes/favorites");

app.use(comicsRoutes);
app.use(charactersRoutes);
app.use(UserRoutes);
app.use(FavoritesRoutes);

app.get("/", (req, res) => {
  res.json("Bienvenue sur l'API de Marvel");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log("server has started");
});
