const express = require("express");

const router = express.Router();

//import login signup
const { login, signup } = require("../controllers/Auth");
const { updateUserWithImageUpload } = require("../controllers/Uploadimages");
const { getUserByEmail } = require("../controllers/getData");
const {
  createNewPost,
  getAllPosts,
  getPostById,
  getUserPost,
  getSearchPost,
  saveLikePost,
  removeLikePost,
  getSavedPosts,
} = require("../controllers/NewPost");

//routes for login and signup
router.post("/login", login);
router.post("/signup", signup);
//update userprofiule
router.post("/updateprofile", updateUserWithImageUpload);
//get userdata
router.get("/getuserdata/:email", getUserByEmail);
//new post of state

router.post("/newpost", createNewPost);
//get all posts
router.get("/getallpost", getAllPosts);
//get post by id
router.get("/post/:id", getPostById);
//get user post
router.get("/userpost/:id/post", getUserPost);
//get search post
router.post("/post/search", getSearchPost);
//save like post
router.post("/savelikepost", saveLikePost);
//rempve save
router.post("/removefromsave", removeLikePost);
//user save post
router.get("/:userId/saved-posts", getSavedPosts);

module.exports = router;
