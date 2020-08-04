const {
  getUsersController,
  getUserByUsernameController,
  addNewUserController,
  loginController,
  deleteUserByIdController,
  getUserByIdController,
  updateUserController,
  getUserIdByUsernameController,
} = require("../controllers/UserController");

module.exports = async (app) => {
  app.get("/user", (req, res) => {
    getUsersController(req, res);
  });
  app.post("/user", (req, res) => {
    addNewUserController(req, res);
  });
  app.get("/user/find", (req, res) => {
    getUserByUsernameController(req, res);
  });
  app.get("/user/getuserid", (req, res) => {
    getUserIdByUsernameController(req, res);
  });

  app.post("/user/signin", (req, res) => {
    loginController(req, res);
  });
  app.delete("/user/delete/:iduser", (req, res) => {
    deleteUserByIdController(req, res);
  });
  app.get("/user/:iduser", (req, res) => {
    getUserByIdController(req, res);
  });
  app.put("/user/update/:iduser", (req, res) => {
    updateUserController(req, res);
  });
};
