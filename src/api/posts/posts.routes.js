const express = require('express');
const {postPost, putPost, deletePost} = require('./posts.controller');
const upload = require('../../utils/middlewares/uploadFile.middleware');

const postsRoutes = express.Router();

postsRoutes.post('/post',upload.single('image'),  postPost);
postsRoutes.put('/:id',upload.single('image'),  putPost);
postsRoutes.delete('/:id', deletePost);


module.exports = postsRoutes;
