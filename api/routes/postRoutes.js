const express = require("express");
const router = express.Router();
const postController = require("./../controllers/postController");

router
  .route("/")
  .get(postController.getAllPosts)
  .post(postController.createPost);

router
  .route("/:id")
  .delete(postController.deletePost)
  .get(postController.getUserPosts)
  .patch(postController.editPost);

router.route("/like/:id").put(postController.likePost);
router.route("/dislike/:id").put(postController.dislikePost);

module.exports = router;
