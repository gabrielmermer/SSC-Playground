const express = require('express');
const router = express.Router();


let storage = {}

// MVC
const userController = require('../controllers/userController');

// JWT
const authenticationService = require('../services/authentication');
const userModel = require('../models/userModel');

router.get('/', (req, res) => {
	console.log('sending back the storage with content');
	console.log(storage)
	res.render('index', {title: 'Express'});
});


router.post('/', (req, res) => {
	console.log(req.body);
	storage = req.body;
	res.send('recived a post request');
});

router.get('/cookies', (req, res) => {

	let counter = req.cookies['visit counter'];
	console.log('Current visit counter: ' + counter);
	// fixing the initial value of counter
	if (isNaN(counter)) counter = 0;
	counter ++;
	console.log('New counter value: ', counter);
	res.cookie('visit counter', counter, {maxAge: 1000});
	res.send('Cookie was set to ' + counter);

})

router.get('/chat', (req, res) => {
	res.render('chat')
})

router.get('/register', (req, res) => {
	res.render('register')
})

// router.post('/register/submit-form', (req, res) => {
// 	console.log(req.body);
	
// 	res.send('Thank you for registering')
// })

router.post('/register/submit-form', userController.registerUser)

router.route('/login')
  .get((req, res, next) => {
	console.log('0');
    res.render('login');
  })
  .post((req, res, next) => {
	console.log('1');
    userModel.getUsers()
      .then((users) => {
		console.log('req body: ' + JSON.stringify(req.body));
        authenticationService.authenticateUser(req.body, users, res);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  });




module.exports = router;
