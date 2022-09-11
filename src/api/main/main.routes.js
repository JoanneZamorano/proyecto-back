const express = require('express');
const { isAuthenticated } = require('../../utils/middlewares/auth.middleware');

const router = express.Router();

router.get('/', (req, res) => {
  return res.send('Servidor funcionando OK');
});

router.get('/test', (req, res) => {
  return res.send('Prueba realizada correctamente. Servidor funcionando.');
});

router.get('/private', [isAuthenticated], (req, res) => {
  return res.send('Si recibo este texto, es que estoy autenticado');
});


module.exports = router;