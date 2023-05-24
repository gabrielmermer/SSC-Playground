const express = require('express');
const router = express.Router();

const path = require('path');

router.get('/', (req, res) => {
	console.log(req.params);
	res.send('This is the /routers URI ' + req.params.id);
});

router.get('/:id', (req, res) => {
	console.log(req.params);
	res.send('Respond with the infos for the user with id ' + req.params.id);
});

router.route('/:id/picture')
	.get(function(req, res) {
		let uID = req.params.id;
		const filename = uID + '.jpg';
		const options = {
			root: path.join(__dirname, '../uploads')
		};
		res.sendFile(filename, options);

	})
	.post(function (req, res) {
		console.log(req.files);
		try {
			if(!req.files) {
				res.send({
					status: false,
					message: 'No file uploaded'
				});
			} else {
				let picture = req.files.pic;

				let filename = './uploads/' + req.params.id + '.jpg'
				picture.mv(filename);
				console.log('saved picture to: ' + filename)

				res.send({
					status: true,
					message: 'File is uploaded',
					data: {
						name: picture.name,
						size: picture.size
					}
				});
			}


		} catch(err) {
			res.status(500).send(err);

		}

	});


module.exports = router;
