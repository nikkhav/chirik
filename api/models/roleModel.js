const mongoose = require("mongoose");

// Role Schema
const roleSchema = new mongoose.Schema({
  value: { type: String, unique: true, default: "USER" },
});

// Export the model
const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
