const express = require('express');
const router = express.Router();


let storage = {}

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



module.exports = router;
