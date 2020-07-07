const sequelize = require("../config/db");
const Sequelize = require("sequelize");
const PostService = require("../services/postService");

const createPost = async (req, res, next) => {
  const post = req.body;
  try{
    const result = await PostService.create(post);
    res.status(201).send({
      result
    });
} catch(err) {
    res.status(400).send({
      message: "Invalid post!",
    });
  }
};

const getPost = async (req, res) => {
  const id = req.params.id;
  if (id) {
    const post = await PostService.getPostById(id);
    res.status(200).send(post);
  }
};

const updatePost = async (req, res) => {
  const post = req.body;
  const id = req.params.id;
  if (id) {
    const result = await PostService.updatePost(id, post.content, post.title);
    res.status(200).send({
      message: "Post updated!",
    });
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  if (id) {
    const result = await PostService.deletePost(id);
    res.status(200).send({
      message: "Post deleted succesfully!",
    });
  }
};

const getPosts = async (req, res) => {
  const result = await PostService.getAll();
  res.status(200).send(result);
};

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getPosts,
};
