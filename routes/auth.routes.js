const authController = require('../controllers/auth.controller.js');
const router = require('express').Router();
const errorHandler = require('../controllers/error');

router.post('/login', errorHandler.errorHandler(authController.login));
router.post('/reset', errorHandler.errorHandler(authController.resetPassword));
router.put('/new', errorHandler.errorHandler(authController.newPassword));

module.exports = router;