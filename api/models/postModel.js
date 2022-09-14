const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  body: {
    type: String,
    required: [true, "A post must have a body"],
  },
  username: {
    type: String,
    required: [true, "A post must have an author' username"],
  },
  firstName: {
    type: String,
    required: [true, "A post must have an author's first name"],
  },
  lastName: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  likes: [
    {
      username: String,
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  comments: [
    {
      body: String,
      username: String,
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  dislikes: [
    {
      username: String,
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
