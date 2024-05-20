const mongoose = require("mongoose");
const users=require("./Users")
const postSchema = new mongoose.Schema({
  user:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Users"
}],
  title: String,
  price: Number,
  address: String,
  description: String,
  city: String,
  bedroomNumber: Number,
  bathroomNumber: Number,
  latitude: Number,
  longitude: Number,
  type: String,
  property: String,
  utilitiesPolicy: String,
  petPolicy: String,
  incomePolicy: String,
  totalSize: Number,
  school: Number,
  bus: Number,
  restaurant: Number,
  images: [String], // Store image URLs
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
