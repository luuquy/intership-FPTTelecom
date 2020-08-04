const user = require("../services/user");
const {
  getUsers,
  addNewUser,
  getUserByUsername,
  deleteUserById,
  getUserById,
  updateUser,
  getUserIdByUsername,
} = require("../services/user");

const db = require("../config/db");
let jwt = require("jsonwebtoken");

const getUsersController = async (req, res) => {
  let data = await getUsers();
  return res.status(200).send(data);
};

const updateUserController = async (req, res) => {
  let iduser = req.body.iduser;
  let fullname = req.body.fullname;
  let password = req.body.password;
  let email = req.body.email;
  console.log(iduser, fullname, password, email);
  if (!iduser) res.status(400).send({ message: "Body cannot be empty." });
  await updateUser(fullname, password, email, iduser);

  return res.status(200).send({ message: "OK" });
};

const getUserByIdController = async (req, res) => {
  let iduser = req.params.iduser;

  if (!iduser) res.status(400).send({ message: "Body cannot be empty." });
  let data = await getUserById(iduser);

  return res.status(200).send(data[0]);
};

const deleteUserByIdController = async (req, res) => {
  let iduser = req.params.iduser;

  if (!req.params.iduser) {
    return res.status(400).send({ message: "Body cannot be empty" });
  } else {
    await deleteUserById(iduser);
    res.status(200).send({ message: "OK Delete User" });
  }
};

const getUserByUsernameController = async (req, res) => {
  let data = req.body;
  if (!data) {
    return res.status(400).send({ message: "Body cannot be empty" });
  }
  let user = await getUserByUsername(data.username);
  if (user) {
    return res.status(200).send(user);
  }
  return res.status(400).send({ message: "Cant found username" });
};

const getUserIdByUsernameController = async (req, res) => {
  let data = req.body;

  if (!data) {
    return res.status(400).send({ message: "Body cannot be empty" });
  }
  let user = await getUserIdByUsername(data.username);

  if (user) {
    return res.status(200).send(user);
  }
  return res.status(400).send({ message: "Cant found username" });
};

const addNewUserController = async (req, res) => {
  data = req.body;
  if (!data) {
    return res.status(400).send({ message: "Body cannot be empty" });
  }

  let user = getUserByUsername(data.username);
  user.then((user) => {
    if (!user) {
      addNewUser(
        data.username,
        data.fullname,
        data.email,
        data.password
      ).then((ok) => res.status(200).send({ message: "Added" }));
    } else {
      res.status(400).send({ message: "Username already exists" });
    }
  });
};

const loginController = async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  let getIdUser = await getUserIdByUsername(username);
  result = JSON.parse(JSON.stringify(getIdUser));
  iduser = result.iduser;
  console.log(iduser);

  db.query("SELECT * FROM user WHERE username = ?", [username], function (
    error,
    results
  ) {
    if (error) {
      res.status(400).send({ message: "There are some error with query" });
    } else {
      if (results.length > 0) {
        if (password == results[0].password) {
          token = jwt.sign(
            {
              iduser: iduser,
              username: username,
              password: password,
            },
            "Demo nerver die",
            { expiresIn: "7d", issuer: "demo.com", subject: "userInfo" },
            (err, token) => {
              if (err) {
                res.json({
                  status: false,
                  message: "Error",
                });
              } else {
                res.json({
                  status: true,
                  message: "OK",
                  accessToken: token,
                });
              }
            }
          );
        } else {
          res.json({
            status: false,
            message: "Username and password does not match",
          });
        }
      } else {
        res.json({
          status: false,
          message: "Username does not exits",
        });
      }
    }
  });
};

module.exports = {
  getUserIdByUsernameController,
  getUsersController,
  getUserByUsernameController,
  addNewUserController,
  loginController,
  deleteUserByIdController,
  getUserByIdController,
  updateUserController,
};
