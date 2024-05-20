const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
  },
  avtar: {
    type: String,
  },
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", //refrence to the post model
    },
  ],
  savePost: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", //refrence to the post model
    },
  ],
});

module.exports = mongoose.model("Users", userSchema);
