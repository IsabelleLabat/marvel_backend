// Import du package 'express'
const express = require("express");
// Appel à la fonction Router(), issue du package 'express'
const router = express.Router();
const axios = require("axios");

// const Character = require("../models/Character");

const app = express();

router.get("/characters", async (req, res) => {
  try {
    const { name, sort, limit, skip } = req.query;

    let APIkey = `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_APIKEY}`;

    if (name) {
      APIkey = APIkey + `&name=${name}`;
    }
    if (sort) {
      APIkey = APIkey + `&sort=${sort}`;
    }
    if (limit) {
      APIkey = APIkey + `&limit=${limit}`;
    }
    if (skip) {
      APIkey = APIkey + `&skip=${skip}`;
    }

    const response = await axios.get(APIkey);
    res.status(200).json({ data: response.data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;

    const APIkey = `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${process.env.MARVEL_APIKEY}`;
    const response = await axios.get(APIkey);
    res.status(200).json({ data: response.data });
    // console.log(req.params.characterId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
