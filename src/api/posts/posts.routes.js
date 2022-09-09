const express = require('express');
const {postPost, putPost, deletePost} = require('./posts.controller');

const postsRoutes = express.Router();

postsRoutes.post('/post',  postPost);
postsRoutes.put('/:id',  putPost);
postsRoutes.delete('/:id', deletePost);


module.exports = postsRoutes;