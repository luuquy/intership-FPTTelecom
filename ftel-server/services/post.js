const db = require("../config/db");

const getPosts = async () => {
  let sql = "SELECT * FROM post";
  let result = new Promise((resolve, reject) => {
    db.query(sql, (err, res, fields) => {
      if (err) reject(err);
      resolve(res);
    });
  });
  return await result;
};

const addNewPost = (values) => {
  let sql = `INSERT INTO post(contentpost) VALUES ( '${values}') `;
  let query = db.query(sql, (err, result, fields) => {
    if (err) throw err;
    console.log(result);
  });
};

//get post

const getPostById = async (postId) => {
  let sql = `SELECT * FROM post WHERE idpost = ${postId}`;
  // db.query(sql, (err, result) => {
  //   if (err) throw new Error(err);
  //   console.log(result[0].contentpost);
  //   return result[0].contentpost;
  // });

  return new Promise((resolve, reject) => {
    db.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};
//update post
const updatePost = async (contentpost, idpost) => {
  let sql = `UPDATE post SET contentpost = '${contentpost}' WHERE idpost = '${idpost}'`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

//delete post

const deletePostById = async (idpost) => {
  let sql = `DELETE FROM post WHERE idpost = '${idpost}'`;
  await db.query(sql, (err, result) => {
    if (err) throw new Error(err);
    console.log(result);
  });
};

module.exports = {
  addNewPost,
  deletePostById,
  getPosts,
  getPostById,
  updatePost,
};
