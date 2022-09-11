const express = require('express');
const { postPost, putPost, deletePost,getAllPosts,getPost} = require('./posts.controller');
const upload = require('../../utils/middlewares/uploadFile.middleware');

const postsRoutes = express.Router();

postsRoutes
    .get('/all',getAllPosts)
    .get('/one/:id',getPost)
    .post('/post',upload.single('image'),  postPost)
    .put('/update/:id',upload.single('image'),  putPost)
    .delete('/delete/:id', deletePost)


module.exports = postsRoutes;
