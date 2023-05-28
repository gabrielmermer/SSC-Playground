const db = require('../services/database.js').config;

let users = [];


let getUsers = () => new Promise((resolve, reject) => {
	db.query("SELECT * FROM users", function (err, users, fields) {
		if (err) {
			reject(err)
		} else {
			console.log(users);
			resolve(users)
			}
		})
	})

	let getUser = user_id => new Promise((resolve, reject) => {
		const userId = parseInt(user_id);

		if (isNaN(userId)) {
			reject(new Error('Invalid user_id'));
			return;
		}
		db.query("SELECT * FROM users WHERE id = ? ", [userId], function (err, user, fields) {
			console.log(user)
			if (err) {
				console.log(err);
				reject(err);
			} else {
				resolve(user[0]);
			}
			
		})
	});

// function getUser(id) {
// 	let user = users.find(element => element.id == id)
// 	if(typeof user !== "undefined") {
// 		return user;
// 	} else {
// 		return 'Error 404: This user could not be found.'
// 	}
// }

// console.log(getUser(1));

//exporting the functions so that they can be used in other files

let updateUser = (userData) => new Promise((resolve, reject)=> {
	let sql = "UPDATE users SET " +
		"name = " + db.escape(userData.name) +// this gives back 'Tony'
		", surname = " + db.escape(userData.surname) +
		", hero = " + db.escape(userData.hero) +
		", email = " + db.escape(userData.email) +
		", info = " + db.escape(userData.info) + "WHERE id = " + parseInt(userData.id);
		"WHERE id = " + parseInt(userData.id);
	console.log(sql);
	db.query(sql, function (err, result, fields){
		if(err) {
			reject(err)
		}
	console.log(result.affectedRows + " rows have been affected")
	resolve(userData)
	})
})

module.exports = {
	getUsers,
	getUser,
	updateUser
}
