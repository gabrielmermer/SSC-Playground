const db = require('../services/database.js').config;



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
		", info = " + db.escape(userData.info) + 
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

const registerUser = async (formData) => {
	try {
	  const sql = `INSERT INTO users (name, surname, hero, email, info, password) VALUES (?, ?, ?, ?, ?, ?)`;
	  const values = [
		formData.name,
		formData.surname,
		formData.hero,
		formData.email,
		formData.info,
		formData.password
	  ];
  
	  console.log(sql);
  
	  const result = await new Promise((resolve, reject) => {
		db.query(sql, values, (err, result) => {
		  if (err) {
			reject(err);
			return; // Exit the callback function on error
		  }
  
		  if (result) {
			console.log(result.affectedRows + " rows have been affected");
			resolve(result.insertId); // Resolve with the insertId if available
		  } else {
			console.log("No result returned");
			resolve(null); // Resolve with null if no result is available
		  }
		});
	  });
  
	  return result;
	} catch (error) {
	  console.log('Error:', error);
	  throw error;
	}
  };
  

module.exports = {
	getUsers,
	getUser,
	updateUser,
	registerUser
}
