const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { check } = require("express-validator");

router.use("/registration", [
  check("username", "Username is required").notEmpty(),
  check("password", "Password must be at least 6 characters").isLength({
    min: 6,
  }),
]);
router.use("/users", authMiddleware, roleMiddleware(["ADMIN"]));

router.route("/registration").post(authController.registration);
router.route("/login").post(authController.login);
router.route("/users").get(authController.getUsers);
router.route("/make-admin").patch(authController.makeAdmin);

module.exports = router;
