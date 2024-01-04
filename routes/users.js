const express = require('express');
const router = express.Router();


// MVC
const userController = require('../controllers/userController')

// JWT auth
const authenticationService = require('../services/authentication');
router.use(authenticationService.authenticateJWT);


router.get('/', userController.getUsers)
router.get('/:id/edit', userController.editUser)
router.post('/:id', userController.updateUser)


module.exports = router;
