const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET= process.env.ACCESS_TOKEN_SECRET;



function authenticateUser({username, password}, users, res){
	console.log('trying to login user');
	console.log('username:', username);
	console.log('password:', password);

	const user = users.find(u => {
		console.log('Comparing:', u.email, 'with', username);
		console.log('Comparing:', u.password, 'with', password);
		return u.email === username && u.password === password;
	});

	console.log(user);
	if (user) {
		// Generate an access token
		console.log('found user');
		const accessToken = jwt.sign({ id: user.id, name: user.name }, ACCESS_TOKEN_SECRET);
		res.cookie('accessToken', accessToken);
		res.redirect('/')
	} else {
		res.send('Username or password incorrect');
	}
}

function authenticateJWT(req, res, next) {

	const token = req.cookies['accessToken'];
	if (token) {
		jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
			if (err) {
				return res.sendStatus(403);
			}
			console.log(user)
			req.user = user;
			next();
		});
	} else {
		res.sendStatus(401);
	}
	if (token) {
		jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
			if (err) {
				return res.sendStatus(403);
			}
			console.log(user)
			req.user = user;
			next();
		});
	}
}






module.exports = {
	authenticateUser,
	authenticateJWT
}

