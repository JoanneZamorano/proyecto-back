const express = require('express');
const { isAllowed } = require('../../utils/middlewares/auth.middleware');
const controller = require('./user.controller');

const router = express.Router();

router
  .post('/register', controller.registerPost)
  .post('/login', controller.loginPost)
  .post('/logout', controller.logoutPost)
  .post('/test', controller.test)
  .get('/:id',  controller.getUsers)
  .get('/',isAllowed(["admin"]),  controller.getAllUsers)
  .put('/update/:id', controller.updateUser)
  .delete('/:id',isAllowed(["admin"]), controller.deleteUser);


module.exports = router;