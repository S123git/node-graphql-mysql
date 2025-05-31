// /models/Post.js
const db = require('../config/db');
const { findById } = require('./User');

const Post = {
  findAll: ( limit, offset ) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM posts  LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM posts WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },
  findByUserId: (userId) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM posts WHERE userId = ?', [userId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
  create: (title, content, userId) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO posts (title, content, userId ) VALUES (?, ?, ?)', [title, content, userId], (err, results) => {
            if (err) reject(err);
            resolve({ id: results.insertId, title, content, userId });
        });
    });
  },
};

module.exports = Post;