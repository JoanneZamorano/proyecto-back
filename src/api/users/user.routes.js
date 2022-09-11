const express = require('express');
const controller = require('./user.controller');

const router = express.Router();

router
  .post('/register', controller.registerPost)
  .post('/login', controller.loginPost)
  .post('/logout', controller.logoutPost)
  .post('/test', controller.test)
  .get('/:id',  controller.getUsers)
  .get('/',  controller.getAllUsers)
  .put('/update/:id', controller.updateUser)
  


module.exports = router;