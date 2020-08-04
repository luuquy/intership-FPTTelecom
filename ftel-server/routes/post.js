const {
  getPostsController,
  addNewPostController,
  deletePostByIdController,
  getPostByIdController,
  updatePostController,
} = require("../controllers/PostController");

module.exports = async (app) => {
  app.get("/post/:idpost", (req, res) => {
    getPostByIdController(req, res);
  });

  app.get("/post", (req, res) => {
    getPostsController(req, res);
  });

  app.post("/post/addpost", (req, res) => {
    addNewPostController(req, res);
  });

  app.delete("/post/deletepost/:idpost", (req, res) => {
    deletePostByIdController(req, res);
  });

  app.put("/post/update/:idpost", (req, res) => {
    updatePostController(req, res);
  });
};
