const User = require("../model/Users");

exports.getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return user data (excluding sensitive information like password)
    res.json({
      success: true,
      user: {
        username: user.userName,
        email: user.email,
        avatar: user.avtar,
        _id: user._id,
        savePost: user.savePost,
        // Add other fields you want to include
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
