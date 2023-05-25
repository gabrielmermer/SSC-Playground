// hardcoded for now 
const users = [
  {
    id: 1,
    name: "Tony",
    surname: "Stark",
    hero: "Iron Man"
  },
  {
    id: 2,
    name: "Wanda",
    surname: "Maximoff",
    hero: "Scarlet Witch"
  },
  {
    id: 3,
    name: "Peter",
    surname: "Parker",
    hero: "Spider-Man"
  }
];

function getUsers() {
	return users;
}

function getUser(id) {
	let user = users.find(element => element.id == id)
	if(typeof user !== "undefined") {
		return user;
	} else {
		return 'Error 404: This user could not be found.'
	}
}

console.log(getUser(2));
console.log(getUser(24444));

//exporting the functions so that they can be used in other files

module.exports = {
	getUsers,
	getUser
}
