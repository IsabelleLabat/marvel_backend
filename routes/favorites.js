// Import du package 'express'
const express = require("express");
// Appel à la fonction Router(), issue du package 'express'
const router = express.Router();
// const axios = require("axios");
const Favorite = require("../models/Favorites");
const isAuthenticated = require("../middlewares/isAuthenticated");

// const Character = require("../models/Character");

const app = express();

// SAVE FAVORITES

router.post("/favorites", isAuthenticated, async (req, res) => {
  try {
    const newFavorites = new Favorite({
      itemId: req.body.itemId,
      name: req.body.name,
      path: req.body.path,
      extension: req.body.extension,
      owner: req.user,
    });
    console.log("coucou");
    await newFavorites.save();

    res.status(201).json(newFavorites);
  } catch (error) {
    res.status(500).json({ message: error.response });
  }
});

// GET ALL FAVORITES

router.get("/favorites", isAuthenticated, async (req, res) => {
  try {
    const favorites = await Favorite.find({ owner: req.user });
    res.status(201).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.response });
  }
});

// DELETE BY ID

router.delete("favorites/:id", isAuthenticated, async (req, res) => {
  try {
    if (req.params.id) {
      await Favorite.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Favorite has been deleted" });
    } else {
      res.status(400).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.response });
  }
});

module.exports = router;
