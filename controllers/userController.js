const userModel = require("../models/userModel");

function getUsers(req, res, next) {
	const users = userModel.getUsers();
	res.render('users', {users});

}

function getUser(req, res, next) {
	const user = userModel.getUser(req.params.id);
	res.json(user);
}

// exporting those two functions, probably to the router
module.exports = {
	getUsers,
	getUser
}
