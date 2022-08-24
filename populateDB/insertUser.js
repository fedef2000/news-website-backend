const fetch = require('node-fetch')

const body = {
    email:"admina",
    password:"admin"
}

const response = fetch('https://localhost:4000/api/users', {
	method: 'post',
	body: JSON.stringify(body),
	headers: {'Content-Type': 'application/json'}
});
const data = response.json();

console.log(`inserito utente: \n ${data}`);