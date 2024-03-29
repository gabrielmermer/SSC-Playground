const userModel = require("../models/userModel");

//function getUsers(req, res, next) {
//	const users = userModel.getUsers();
//	res.render('users', {users});
//
//}

function getUsers(req, res, next) {
	userModel.getUsers()
		.then(users => res.render('users', {users}))
		.catch(err => res.sendStatus(500))
}

function getUser(req, res, next) {
	userModel.getUser(parseInt(req.params.id))
		.then(user => res.render('user', {user}))
		.catch(err => res.sendStatus(500))
}

function editUser(req, res, next) {
	userModel.getUser(req.params.id)
		.then(user => res.render('editUser', {user}))
		.catch(error => res.sendStatus(500))
}

function updateUser(req, res, next) {
	userModel.updateUser(req.body)
		.then(user => res.render('user', {user}))
		.catch(error => res.sendStatus(500))
}

function registerUser(req, res, next) {
	userModel.registerUser(req.body)
	.then(() => res.sendStatus(200))
	.catch(error => res.sendStatus(500))
}

// exporting those two functions, probably to the router
module.exports = {
	getUsers,
	getUser,
	editUser,
	updateUser,
	registerUser
}
