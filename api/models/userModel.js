const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String },
  roles: [{ type: String, ref: "Role" }],
});

// Export the model
const User = mongoose.model("User", userSchema);
module.exports = User;
