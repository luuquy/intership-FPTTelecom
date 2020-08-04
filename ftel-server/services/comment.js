const db = require("../config/db");

const addNewComment = (contentcomment, iduser, idpost) => {
  const sql = `INSERT INTO comment (contentcomment, iduser, idpost) VALUES ('${contentcomment}', '${iduser}', '${idpost}')`;
  return (result = db.query(sql, (err, res) => {
    if (err) return new Error(err);
    console.log(res);
  }));
};

const getAllCommentByIdPost = async (idpost) => {
  let sql = `select idcomment, contentcomment, iduser from comment where idpost = '${idpost}'`;
  let result = new Promise((resolve, reject) => {
    db.query(sql, (err, res, fields) => {
      if (err) reject(err);
      resolve(res);
    });
  });
  return await result;
};
const getUserName = async (idcomment) => {
  let sql = `SELECT username FROM user 
             JOIN comment ON comment.iduser = user.iduser
            WHERE idcomment = "${idcomment}"  
  `;
  let result = new Promise((resolve, reject) => {
    db.query(sql, (err, res, fields) => {
      if (err) reject(err);
      resolve(res);
    });
  });
  return await result;
};
module.exports = {
  addNewComment,
  getAllCommentByIdPost,
  getUserName,
};
