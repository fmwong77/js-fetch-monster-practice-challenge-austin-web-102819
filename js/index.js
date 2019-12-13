window.addEventListener('DOMContentLoaded', function() {
	let page = 1;
	function getMonsters(page) {
		fetch(`http://localhost:3000/monsters/?_limit=5&_page=${page}`)
			.then((response) => response.json())
			.then((jsonData) => displayMonsters(jsonData));
	}

	function displayMonsters(monsters) {
		const monsterContainer = document.getElementById('monster-container');
		monsterContainer.innerHTML = '';
		// create element here happens once
		monsters.forEach((monster) => {
			const monsterElement = document.createElement('div');
			console.log(monster.name);

			monsterElement.innerText = monster.name;
			const description = document.createElement('p');
			description.innerText = `Description: ${monster.description}`;
			const age = document.createElement('p');
			age.innerText = `Age: ${monster.age}`;
			monsterElement.appendChild(age);
			monsterElement.appendChild(description);
			monsterContainer.appendChild(monsterElement);
		});
	}

	const form = document.querySelector('form');
	form.addEventListener('submit', addMonster);
	function addMonster(event) {
		event.preventDefault();
		console.log('submit');
		const name = document.querySelector('input[name=name]').value;
		const age = document.querySelector('input[name=age]').value;
		const description = document.querySelector('input[name=description]').value;
		console.log(name, age, description);
		fetch('http://localhost:3000/monsters', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ name: name, age: age, description: description })
		});
	}

	const forward = document.getElementById('forward');
	const back = document.getElementById('back');

	forward.addEventListener('click', () => pageUp());
	back.addEventListener('click', () => pageDown());

	function pageUp() {
		page += 1;
		console.log(page);
		getMonsters(page);
	}

	function pageDown() {
		page -= 1;
		console.log(page);
		page > 0 ? getMonsters(page) : getMonsters(1);
	}

	getMonsters(page);
});
