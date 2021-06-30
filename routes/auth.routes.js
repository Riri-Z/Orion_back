const authController = require('../controllers/auth.controller.js');
const router = require('express').Router();
const errorHandler = require('../controllers/error');

router.post('/login', errorHandler.errorHandler(authController.login));

module.exports = router;