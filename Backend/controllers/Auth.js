const bcrypt = require("bcrypt");
const Users = require("../model/Users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    //check user is already exist
    const existingUser = await Users.find({ email });
    console.log(existingUser);
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }
    //secure password
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error in HAshing Password",
      });
    }

    //create entry for use
    const user = await Users.create({
      userName,
      email,
      password: hashPassword,
    });

    return res.status(200).json({
      success: true,
      message: "user createrd successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user cant be resgister please try again later",
    });
  }
};

//login handler

exports.login = async (req, res) => {
  try {
    //fetch data
    const { email, password } = req.body;

    //validation on email andd password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fill details!!",
      });
    }

    let user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found please sign in!!",
      });
    }

    //verify password and generate a jwt token
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    if (bcrypt.compare(password, user.password)) {
      //create jwt token
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user = user.toObject();
      user.token = token;
      user.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      //create cookie
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "login successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "password incorrect!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Login Failure",
    });
  }
};
