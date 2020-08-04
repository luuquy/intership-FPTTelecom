const db = require("../config/db");

const getUsers = async () => {
  let sql = "SELECT * FROM user";
  let result = new Promise((resolve, reject) => {
    db.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
  return await result;
};

const getUserByUsername = (value) => {
  let sql = `SELECT * FROM user WHERE username = "${value}"`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res[0]);
    });
  });
};

const getUserIdByUsername = (value) => {
  let sql = `SELECT iduser FROM user WHERE username = "${value}"`;

  return new Promise((resolve, reject) => {
    db.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res[0]);
    });
  });
};

const auth = (user) => {
  return new Promise((resolve, reject) => {
    getUserByUsername(user.username)
      .then((req) => {
        console.log(req);
        resolve(req);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const addNewUser = (username, fullname, email, password) => {
  let sql = `INSERT INTO user(username, fullname, email, password) VALUES ('${username}', '${fullname}', '${email}',  '${password}') `;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const deleteUserById = async (iduser) => {
  let sql = `DELETE FROM user WHERE iduser = '${iduser}'`;
  await db.query(sql, (err, result) => {
    if (err) throw new Error(err);
    console.log(result);
  });
};

const getUserById = async (iduser) => {
  let sql = `SELECT * FROM user WHERE iduser = ${iduser}`;

  return new Promise((resolve, reject) => {
    db.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

//update post
const updateUser = async (fullname, password, email, iduser) => {
  let sql = `UPDATE user SET fullname = '${fullname}', password = '${password}', email = '${email}' WHERE iduser = '${iduser}'`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

module.exports = {
  updateUser,
  getUsers,
  addNewUser,
  getUserByUsername,
  auth,
  deleteUserById,
  getUserById,
  getUserIdByUsername,
};
