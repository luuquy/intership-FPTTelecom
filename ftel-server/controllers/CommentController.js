const {
  addNewComment,
  getAllCommentByIdPost,
  getUserName,
} = require("../services/comment");

const addNewCommentController = async (req, res) => {
  let body = req.body;
  let { contentcomment, iduser, idpost } = body;

  if (!body) {
    return res.status(400).send({ message: "Body cannot be empty. " });
  }

  await addNewComment(contentcomment, iduser, idpost);
  return res.status(200).send({ message: "Added comment" });
};

const getAllCommentByIdPostController = async (req, res) => {
  let body = req.params;
  let { idpost } = body;

  if (!body) {
    return res.status(400).send({ message: "Body cannot be empty. " });
  }
  let getData = await getAllCommentByIdPost(idpost);
  let data = JSON.stringify(getData);

  return res.status(200).send(data);
};

const getUserNameController = async (req, res) => {
  let idcomment = req.params.idcomment;

  console.log(idcomment);
  if (!idcomment) {
    return res.status(400).send({ message: "Body cannot be empty. " });
  }
  let getData = await getUserName(idcomment);
  let data = JSON.stringify(getData[0]);
  let parData = JSON.parse(data);
  console.log(parData.username);
  return res.status(200).send(parData.username);
};

module.exports = {
  addNewCommentController,
  getAllCommentByIdPostController,
  getUserNameController,
};
