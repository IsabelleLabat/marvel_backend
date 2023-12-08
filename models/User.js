// J'importe mongoose pour pouvoir faire mongoose.model
const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: String,

  account: {
    username: {
      type: String,
      required: true,
    },
    avatar: Object,
  },

  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
