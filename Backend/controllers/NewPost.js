const { response } = require("express");
const Post = require("../model/Post"); // Correct the path if necessary
const Users = require("../model/Users");
const cloudinary = require("cloudinary").v2;

// Define the upload function
async function uploadFilesToCloudinary(files, folder) {
  const uploads = files.map((file) =>
    cloudinary.uploader.upload(file.tempFilePath, { folder })
  );
  return await Promise.all(uploads);
}

// Define the createNewPost function
exports.createNewPost = async (req, res) => {
  try {
    // Data retrieval
    const {
      userEmail,
      title,
      price,
      address,
      description,
      city,
      bedroomNumber,
      bathroomNumber,
      latitude,
      longitude,
      type,
      property,
      utilitiesPolicy,
      petPolicy,
      incomePolicy,
      totalSize,
      school,
      bus,
      restaurant,
    } = req.body;
    const user = await Users.findOne({ email: userEmail });

    // Image files retrieval
    const imageFiles = req.files?.images;

    // Validate image types (if applicable)
    if (imageFiles) {
      const supportedTypes = ["jpg", "png", "jpeg", "webp"];
      const invalidFiles = imageFiles.filter(
        (file) =>
          !supportedTypes.includes(file.name.split(".").pop().toLowerCase())
      );

      if (invalidFiles.length > 0) {
        return res.status(400).json({
          success: false,
          message: "One or more files are not supported types",
        });
      }
    }

    // Image upload logic (if applicable)
    let imageUrls = [];
    if (imageFiles) {
      const cloudinaryResponses = await uploadFilesToCloudinary(
        imageFiles,
        "myFolder"
      ); // Assuming upload function
      imageUrls = cloudinaryResponses.map((response) => response.secure_url);
    }
    //find user id

    // Create new post
    const newPost = new Post({
      user: user._id,
      title,
      price,
      address,
      description,
      city,
      bedroomNumber,
      bathroomNumber,
      latitude,
      longitude,
      type,
      property,
      utilitiesPolicy,
      petPolicy,
      incomePolicy,
      totalSize,
      school,
      bus,
      restaurant,
      images: imageUrls, // Store image URLs
    });

    // Save the new post
    await newPost.save();
    user.post = newPost._id;
    console.log(user);
    await user.save();
    res.json({
      success: true,
      message: "Post created successfully",
      post: newPost, // Include the new post data in response
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Function to get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserPost = async (req, res) => {
  try {
    const userid = req.params.id;
    const user = await Users.findById(userid).populate("post"); // Use populate to get post details

    if (!user) {
      return res.status(404).json({ message: "Post not found" });
    }
    console.log(user.post);
    res.json(user.post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getSearchPost = async (req, res) => {
  try {
    const { city, type, property, minPrice, maxPrice, bedroom } = req.body;

    // Build the query object
    let query = {};

    if (city) query.city = city;
    if (type) query.type = type;
    if (property) query.property = property;
    if (minPrice) query.price = { $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };
    if (bedroom) query.bedroomNumber = Number(bedroom);

    const posts = await Post.find(query);
    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//save liked post
exports.saveLikePost = async (req, res) => {
  const { userId, placeId } = req.body;
  console.log(placeId);
  console.log(userId);
  try {
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Assuming user.savelist is an array of saved place IDs
    // if (!user.savelist.includes(placeId)) {
    user.savePost.push(placeId);
    await user.save();
    // }

    res.status(200).json({ message: "Place saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//remove like
exports.removeLikePost = async (req, res) => {
  const { userId, placeId } = req.body;

  try {
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the placeId in the user's save list
    const index = user.savePost.indexOf(placeId);
    if (index !== -1) {
      // Remove the placeId from the user's save list
      user.savePost.splice(index, 1);
      await user.save();
    }

    return res.status(200).json({ message: "Place removed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//save post of user
exports.getSavedPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch all posts that the user has saved
    const savedPosts = await Post.find({ _id: { $in: user.savePost } });

    return res.status(200).json(savedPosts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
