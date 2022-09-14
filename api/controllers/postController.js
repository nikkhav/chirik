const Post = require("../models/postModel");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: posts.length,
      posts,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        post: newPost,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent!",
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
      deletedPost: post,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.editPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } else {
      res.status(403).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ username: req.params.id });
    res.status(200).json({
      status: "success",
      results: posts.length,
      posts,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.likes.find((like) => like.username === req.body.username)) {
      post.likes = post.likes.filter(
        (like) => like.username !== req.body.username
      );
    } else {
      post.likes.push(req.body);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        likes: post.likes,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.dislikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.dislikes.find((dislike) => dislike.username === req.body.username)
    ) {
      post.dislikes = post.dislikes.filter(
        (dislike) => dislike.username !== req.body.username
      );
    } else {
      post.dislikes.push(req.body);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        dislikes: post.dislikes,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};
