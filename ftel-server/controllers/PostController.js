const post = require("../services/post");

const {
  deletePostById,
  getPosts,
  addNewPost,
  getPostById,
  updatePost,
} = require("../services/post");

const updatePostController = async (req, res) => {
  let idpost = req.body.idpost;
  let contentpost = req.body.contentpost;

  if (!idpost) res.status(400).send({ message: "Body cannot be empty." });
  await updatePost(contentpost, idpost);

  return res.status(200).send({ message: "OK" });
};

const getPostByIdController = async (req, res) => {
  let idpost = req.params.idpost;

  if (!idpost) res.status(400).send({ message: "Body cannot be empty." });
  let data = await getPostById(idpost);

  return res.status(200).send(data[0]);
};

const deletePostByIdController = async (req, res) => {
  let idpost = req.params.idpost;

  if (!req.params.idpost) {
    return res.status(400).send({ message: "Body cannot be empty" });
  } else {
    await deletePostById(idpost);
    res.status(200).send({ message: "OK" });
  }
};

const getPostsController = async (req, res) => {
  let data = await getPosts();
  return res.status(200).send(data);
};

const addNewPostController = async (req, res) => {
  let data = req.body;
  if (!data) {
    return res.status(400).send({ message: "Body cannot be empty" });
  }

  await addNewPost([data.contentpost]);
  return res.status(200).send(data);
};

module.exports = {
  getPostsController,
  addNewPostController,
  deletePostByIdController,
  getPostByIdController,
  updatePostController,
};
