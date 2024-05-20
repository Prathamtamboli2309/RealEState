const { response } = require("express");
const User = require("../model/Users");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");

async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.updateUserWithImageUpload = async (req, res) => {
  try {
    // Data retrieval
    const { username, email, password } = req.body;

    // Image file retrieval
    const imageFile = req.files?.imagefile;

    // Validate image type (if applicable)
    if (imageFile) {
      const supportedTypes = ["jpg", "png", "jpeg"];
      const fileType = imageFile.name.split(".").pop().toLowerCase();
      if (!supportedTypes.includes(fileType)) {
        return res.status(400).json({
          success: false,
          message: "Not Supported File Type",
        });
      }
    }

    // Find the user to update
    const user = await User.findOne({ email }); // Assuming email is the unique identifier

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user data (excluding password if not provided)
    user.userName = username;
    user.email = email; // Assuming email shouldn't be updated
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    // Image upload logic (if applicable)
    if (imageFile) {
      const cloudinaryResponse = await uploadFileToCloudinary(
        imageFile,
        "myFolder"
      ); // Assuming upload function
      user.avtar = cloudinaryResponse.secure_url; // Update user's avatar URL
    }

    // Save the updated user
    await user.save();

    res.json({
      success: true,
      message: "User updated successfully",
      user: { username, email, avatar: user.avtar }, // Include relevant user data in response
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
