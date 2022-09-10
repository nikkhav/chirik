const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    // Get the token from the header
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({
        status: "error",
        message: "Unauthorized",
      });
    }
    // Verify the token
    const decodedData = jwt.verify(token, secret);
    req.user = decodedData;
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "Not authorized" });
  }
};
