const {
  addNewCommentController,
  getAllCommentByIdPostController,
  getUserNameController,
} = require("../controllers/CommentController");

module.exports = async (app) => {
  app.post("/comment/add", (req, res) => {
    addNewCommentController(req, res);
  });
  app.get("/comment/getbyidpost/:idpost", (req, res) => {
    getAllCommentByIdPostController(req, res);
  });
  app.get("/comment/getusername/:idcomment", (req, res) => {
    getUserNameController(req, res);
  });
};
