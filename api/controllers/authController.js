const User = require("../models/userModel");
const Role = require("../models/roleModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("../config");

// Generate an access token
function generateAccessToken(userId, roles) {
  const payload = {
    userId,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
}

exports.registration = async (req, res) => {
  try {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors,
      });
    }

    // Get user's input
    const { username, password, firstname, lastname } = req.body;
    const candidate = await User.findOne({ username });

    // If the user already exists, return an error
    if (candidate) {
      return res.status(400).json({
        status: "error",
        message: "This user already exists",
      });
    }
    // If the user does not exist, create a new user
    // Hash the password
    const hashPassword = bcrypt.hashSync(password, 7);
    // Give the user the role of "USER"
    const userRole = await Role.findOne({ value: "USER" });
    // Create a new user
    const user = new User({
      username,
      password: hashPassword,
      firstname,
      lastname,
      roles: [userRole.value],
    });
    // Save the user to the database
    await user.save();
    // Return a successful response

    res.status(200).json({
      status: "success",
      message: "User has been successfully created",
      userData: {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Registration failed",
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    // Validate the request
    const { username, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ username });

    // If the user does not exist, return an error
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: `User ${username} does not exist`,
      });
    }
    // If the user exists, check the password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        status: "error",
        message: "Invalid password",
      });
    }
    // If the password is correct, generate an access token
    const token = generateAccessToken(user._id, user.roles);
    // Return a successful response
    return res.status(200).json({
      status: "success",
      message: "User has been successfully logged in",
      username,
      firstname: user.firstname,
      lastname: user.lastname,
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Login failed",
      error: err.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    // Find all users in the database
    const users = await User.find();
    // Return a successful response
    return res.status(200).json({
      status: "success",
      message: "Users have been successfully retrieved",
      users,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Get users failed",
      error: err.message,
    });
  }
};

exports.makeAdmin = async (req, res) => {
  try {
    //Find the user in the database
    const user = await User.findOneAndUpdate(
      {
        username: req.body.username,
      },
      {
        roles: ["ADMIN", "USER"],
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      message: "User has been successfully updated",
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Make admin failed",
      error: err.message,
    });
  }
};
