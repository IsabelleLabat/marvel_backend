// Import du package 'express'
const express = require("express");
// Appel à la fonction Router(), issue du package 'express'
const router = express.Router();
const axios = require("axios");

const app = express();

router.get("/comics", async (req, res) => {
  try {
    const { title, sort, limit, skip } = req.query;

    let APIkey = `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_APIKEY}`;

    if (title) {
      APIkey = APIkey + `&title=${title}`;
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

    // console.log({ data: response.data });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get("/comic/:comicId", async (req, res) => {
  try {
    const comicId = req.params.comicId;
    const APIkey = `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${process.env.MARVEL_APIKEY}`;
    const response = await axios.get(APIkey);
    res.status(200).json({ data: response.data });
    console.log(req.params.comicId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;
    const APIkey = `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.MARVEL_APIKEY}`;
    const response = await axios.get(APIkey);
    res.status(200).json({ data: response.data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
