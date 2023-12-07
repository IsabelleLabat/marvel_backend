const mongoose = require("mongoose");

const Favorites = mongoose.model("Favorites", {
  itemId: String,
  title: String,
  name: String,

  path: String,
  extension: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Favorites;
