const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function (roles) {
  return function (req, res, next) {
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
      const { roles: userRoles } = jwt.verify(token, secret);
      let hasRole = false;

      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        return res.status(403).json({
          status: "error",
          message: "You do not have access to this resource",
        });
      }
      next();
    } catch (e) {
      console.log(e);
      return res.status(403).json({ message: "Not authorized" });
    }
  };
};
